require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const https = require('https');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

// PayPal API Configuration
const PAYPAL_API_BASE = 'https://api.sandbox.paypal.com';
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

// Helper: Get PayPal Access Token
async function getPayPalAccessToken() {
  return new Promise((resolve, reject) => {
    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString('base64');
    const postData = 'grant_type=client_credentials';

    const options = {
      hostname: 'api.sandbox.paypal.com',
      port: 443,
      path: '/v1/oauth2/token',
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          resolve(response.access_token);
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

// Helper: Make PayPal API Request
async function makePayPalRequest(method, path, data, token) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data);
    const options = {
      hostname: 'api.sandbox.paypal.com',
      port: 443,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => { responseData += chunk; });
      res.on('end', () => {
        try {
          const response = JSON.parse(responseData);
          resolve(response);
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', reject);
    if (postData) req.write(postData);
    req.end();
  });
}

// Middleware
app.use(cors());

// Content Security Policy header (permissive for development)
app.use((req, res, next) => {
  // DEVELOPMENT ONLY: permissive policy including unsafe-eval to avoid CSP eval errors from local tooling/extensions.
  // WARNING: Do NOT use this in production.
  res.setHeader('Content-Security-Policy', "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; script-src * 'unsafe-inline' 'unsafe-eval' data: blob:; style-src * 'unsafe-inline' data:; connect-src * ; img-src * data:; font-src * data:;");
  next();
});

// Simple request logger for debugging
app.use((req, res, next) => {
  console.log(new Date().toISOString(), req.method, req.originalUrl);
  next();
});

// PayPal Create Order endpoint
app.post('/api/paypal/create-order', bodyParser.json(), async (req, res) => {
  const { amount, currency, description } = req.body;
  try {
    // Get PayPal access token
    const token = await getPayPalAccessToken();
    
    const orderData = {
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: currency || 'USD',
          value: amount.toString()
        },
        description: description || 'Donation to Wolayo'
      }],
      redirect_urls: {
        return_url: `${process.env.APP_URL || 'http://localhost:3000'}/donate?success=true`,
        cancel_url: `${process.env.APP_URL || 'http://localhost:3000'}/donate?cancelled=true`
      }
    };

    const response = await makePayPalRequest('POST', '/v2/checkout/orders', orderData, token);
    console.log('PayPal Order Created:', response.id);
    res.json({ id: response.id });
  } catch (error) {
    console.error('PayPal Create Order Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Config endpoint to serve public config values (PayPal client ID)
app.get('/api/config/paypal-client-id', (req, res) => {
  res.json({ clientId: process.env.PAYPAL_CLIENT_ID || '' });
});

// PayPal Capture Order endpoint
app.post('/api/paypal/capture-order', bodyParser.json(), async (req, res) => {
  const { orderID, amount, currency, donorName, donorEmail, donationType } = req.body;
  try {
    const token = await getPayPalAccessToken();
    const response = await makePayPalRequest('POST', `/v2/checkout/orders/${orderID}/capture`, {}, token);
    
    console.log('PayPal Order Captured:', response.id);

    // Save donation to database
    const donation = new Donation({
      amount,
      currency,
      donorName,
      donorEmail,
      donationType,
      paymentMethod: 'paypal',
      paypalOrderId: response.id,
      status: 'completed',
      transactionId: response.purchase_units[0].payments.captures[0].id
    });
    await donation.save();

    res.json({ success: true, orderId: response.id });
  } catch (error) {
    console.error('PayPal Capture Order Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Body parsers for other routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Mongoose Models
const DonationSchema = new mongoose.Schema({
  amount: Number,
  currency: String,
  donationType: String, // 'one-time' or 'monthly'
  donorName: String,
  donorEmail: String,
  donorPhone: String,
  paymentMethod: { type: String, enum: ['paypal', 'stripe'], default: 'paypal' },
  paypalOrderId: String,
  stripeSessionId: String,
  transactionId: String,
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now, index: true }
});

const VolunteerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  preferences: String,
  experience: String,
  availability: String,
  createdAt: { type: Date, default: Date.now, index: true }
});

const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now, index: true }
});

// Password Reset Token Schema
const PasswordResetSchema = new mongoose.Schema({
  email: String,
  token: String,
  expires: Date,
  createdAt: { type: Date, default: Date.now }
});

const Donation = mongoose.model('Donation', DonationSchema);
const Volunteer = mongoose.model('Volunteer', VolunteerSchema);
const Contact = mongoose.model('Contact', ContactSchema);
const PasswordReset = mongoose.model('PasswordReset', PasswordResetSchema);

// API Routes
// Placeholder routes - we'll implement them next
app.post('/api/donate', async (req, res) => {
  try {
    const { amount, currency = 'USD', type, name, email, phone } = req.body;

    // Save to DB (payment handled client-side with PayPal)
    const newDonation = new Donation({
      amount: parseFloat(amount),
      currency: currency.toUpperCase(),
      donationType: type,
      donorName: name,
      donorEmail: email,
      donorPhone: phone,
      paymentMethod: 'paypal',
      status: 'pending'
    });
    await newDonation.save();

    res.json({ 
      success: true, 
      message: 'Donation initiated. Please complete payment on the next page.',
      donationId: newDonation._id
    });
  } catch (error) {
    console.error('Error creating donation:', error);
    res.status(500).json({ message: 'Error processing donation' });
  }
});

app.post('/api/volunteer', async (req, res) => {
  try {
    const { name, email, phone, preferences, experience, availability } = req.body;
    const newVolunteer = new Volunteer({ name, email, phone, preferences, experience, availability });
    await newVolunteer.save();
    res.status(201).json({ message: 'Volunteer application submitted successfully' });
  } catch (error) {
    console.error('Error saving volunteer:', error);
    res.status(500).json({ message: 'Error submitting application' });
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(201).json({ message: 'Contact message sent successfully' });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ message: 'Error sending message' });
  }
});

// Admin Authentication Middleware
const adminAuth = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token || token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};

// Email Transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Admin Login
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    res.json({ token: process.env.ADMIN_TOKEN });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Forgot Password - Generate Reset Token & Send Email
app.post('/api/admin/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (email !== process.env.ADMIN_USERNAME && email !== 'admin') {
      return res.status(400).json({ message: 'Email not associated with admin account' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const expiresAt = new Date(Date.now() + parseInt(process.env.RESET_TOKEN_EXPIRY || 3600) * 1000);

    // Save reset token to DB
    await PasswordReset.findOneAndUpdate(
      { email },
      { email, token: hashedToken, expires: expiresAt },
      { upsert: true, new: true }
    );

    // Send email with reset link
    const resetLink = `http://localhost:3000/admin?resetToken=${resetToken}&email=${email}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Wolayo Admin - Password Reset',
      html: `
        <h2>Password Reset Request</h2>
        <p>Click the link below to reset your password (expires in 1 hour):</p>
        <a href="${resetLink}" style="display:inline-block;padding:10px 20px;background:#22c55e;color:white;text-decoration:none;border-radius:5px;">Reset Password</a>
        <p>Or copy this token: <code>${resetToken}</code></p>
      `
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Email error:', err);
        return res.status(500).json({ message: 'Error sending reset email' });
      }
      res.json({ message: 'Reset link sent to email' });
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error processing request' });
  }
});

// Verify Reset Token
app.post('/api/admin/verify-reset-token', async (req, res) => {
  try {
    const { resetToken } = req.body;
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    const record = await PasswordReset.findOne({
      token: hashedToken,
      expires: { $gt: new Date() }
    });

    if (!record) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    res.json({ message: 'Token valid', email: record.email });
  } catch (error) {
    res.status(500).json({ message: 'Error verifying token' });
  }
});

// Reset Password with Token
app.post('/api/admin/reset-password', async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    const record = await PasswordReset.findOne({
      token: hashedToken,
      expires: { $gt: new Date() }
    });

    if (!record) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // TODO: In production, store hashed password in a separate Admin collection
    // For now, we'll update the env (not secure - for demo only)
    console.log(`Password reset for ${record.email} (hash: ${hashedPassword.substring(0, 10)}...)`);

    // Delete the used token
    await PasswordReset.deleteOne({ _id: record._id });

    res.json({ message: 'Password reset successful. Please login with your new password.' });
  } catch (error) {
    res.status(500).json({ message: 'Error resetting password' });
  }
});

// Admin Dashboard: Get Analytics
app.get('/api/admin/analytics', adminAuth, async (req, res) => {
  try {
    const totalDonations = await Donation.countDocuments();
    const totalDonationAmount = await Donation.aggregate([
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const totalVolunteers = await Volunteer.countDocuments();
    const totalContacts = await Contact.countDocuments();
    const donationsByCurrency = await Donation.aggregate([
      { $group: { _id: '$currency', count: { $sum: 1 }, total: { $sum: '$amount' } } }
    ]);
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const donationsOverTime = await Donation.aggregate([
      { $match: { createdAt: { $gte: thirtyDaysAgo } } },
      { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, count: { $sum: 1 }, total: { $sum: '$amount' } } },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      totalDonations,
      totalDonationAmount: totalDonationAmount[0]?.total || 0,
      totalVolunteers,
      totalContacts,
      donationsByCurrency,
      donationsOverTime
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ message: 'Error fetching analytics' });
  }
});

// Admin: Get all donations
app.get('/api/admin/donations', adminAuth, async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 }).limit(100).lean();
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching donations' });
  }
});

// Admin: Get all volunteers
app.get('/api/admin/volunteers', adminAuth, async (req, res) => {
  try {
    const volunteers = await Volunteer.find().sort({ createdAt: -1 }).limit(100).lean();
    res.json(volunteers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching volunteers' });
  }
});

// Admin: Get all contacts
app.get('/api/admin/contacts', adminAuth, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }).limit(100).lean();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contacts' });
  }
});

// Admin: Delete donation
app.delete('/api/admin/donations/:id', adminAuth, async (req, res) => {
  try {
    await Donation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Donation deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting donation' });
  }
});

// Admin: Delete volunteer
app.delete('/api/admin/volunteers/:id', adminAuth, async (req, res) => {
  try {
    await Volunteer.findByIdAndDelete(req.params.id);
    res.json({ message: 'Volunteer record deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting volunteer' });
  }
});

// Admin: Delete contact
app.delete('/api/admin/contacts/:id', adminAuth, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Contact deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contact' });
  }
});

// Serve admin dashboard at /admin
const path = require('path');
app.get('/admin', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'admin.html'));
});

// Clean URLs - serve pages without .html extension
app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, 'index.html')));
app.get('/donate', (req, res) => res.sendFile(path.resolve(__dirname, 'donate.html')));
app.get('/volunteer-application', (req, res) => res.sendFile(path.resolve(__dirname, 'volunteer-application.html')));
app.get('/contact', (req, res) => res.sendFile(path.resolve(__dirname, 'contact.html')));
app.get('/about', (req, res) => res.sendFile(path.resolve(__dirname, 'about.html')));
app.get('/programs', (req, res) => res.sendFile(path.resolve(__dirname, 'programs.html')));
app.get('/get-involved', (req, res) => res.sendFile(path.resolve(__dirname, 'get-involved.html')));
app.get('/thank-you-volunteer', (req, res) => res.sendFile(path.resolve(__dirname, 'thank-you-volunteer.html')));

// Redirect .html URLs to clean URLs
app.get('/donate.html', (req, res) => res.redirect(301, '/donate'));
app.get('/volunteer-application.html', (req, res) => res.redirect(301, '/volunteer-application'));
app.get('/contact.html', (req, res) => res.redirect(301, '/contact'));
app.get('/about.html', (req, res) => res.redirect(301, '/about'));
app.get('/programs.html', (req, res) => res.redirect(301, '/programs'));
app.get('/get-involved.html', (req, res) => res.redirect(301, '/get-involved'));
app.get('/thank-you-volunteer.html', (req, res) => res.redirect(301, '/thank-you-volunteer'));
app.get('/admin.html', (req, res) => res.redirect(301, '/admin'));

// Serve static files (your HTML, CSS, JS) - MUST be after API routes
app.use(express.static('.'));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});