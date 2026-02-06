require('dotenv').config();
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define schemas
const DonationSchema = new mongoose.Schema({
  amount: Number,
  currency: String,
  type: String,
  name: String,
  email: String,
  phone: String,
  stripeSessionId: String,
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

const VolunteerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  preferences: String,
  experience: String,
  availability: String,
  createdAt: { type: Date, default: Date.now }
});

const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

const Donation = mongoose.model('Donation', DonationSchema);
const Volunteer = mongoose.model('Volunteer', VolunteerSchema);
const Contact = mongoose.model('Contact', ContactSchema);

// Sample data
const sampleDonations = [
  { amount: 50, currency: 'usd', type: 'once', name: 'John Doe', email: 'john@example.com', phone: '+1234567890', status: 'completed' },
  { amount: 100, currency: 'usd', type: 'monthly', name: 'Jane Smith', email: 'jane@example.com', phone: '+1987654321', status: 'completed' },
  { amount: 500000, currency: 'ugx', type: 'once', name: 'Kampala Donor', email: 'kampala@example.ug', phone: '+256701234567', status: 'completed' },
  { amount: 25, currency: 'usd', type: 'once', name: 'Mike Johnson', email: 'mike@example.com', phone: '+1555666777', status: 'pending' },
  { amount: 75, currency: 'usd', type: 'monthly', name: 'Sarah Wilson', email: 'sarah@example.com', phone: '+1444555666', status: 'completed' },
];

const sampleVolunteers = [
  { name: 'Alice Brown', email: 'alice@example.com', phone: '+1234567890', preferences: 'Teaching, Mentoring, Community Outreach', experience: 'Bachelor\'s degree in Education, 2 years volunteer experience', availability: 'Weekends, 10 hours/week' },
  { name: 'Bob Johnson', email: 'bob@example.com', phone: '+1987654321', preferences: 'IT Support, Fundraising, Communication', experience: 'Master\'s degree in Business, 5 years corporate experience', availability: 'Evenings, 5 hours/week' },
  { name: 'Cynthia Lee', email: 'cynthia@example.com', phone: '+1555666777', preferences: 'Healthcare, Counseling, Administrative', experience: 'Nursing degree, 3 years healthcare volunteer', availability: 'Flexible, 15 hours/week' },
];

const sampleContacts = [
  { name: 'David Miller', email: 'david@example.com', message: 'Partnership Inquiry: I would like to discuss potential partnership opportunities between our organization and Wolayo.' },
  { name: 'Emma Davis', email: 'emma@example.com', message: 'Event Sponsorship: Would Wolayo be interested in sponsoring our upcoming charity run for children\'s education?' },
  { name: 'Frank Wilson', email: 'frank@example.com', message: 'Media Inquiry: I am a journalist interested in covering your organization\'s impact story.' },
];

async function seedDatabase() {
  try {
    // Clear existing data
    await Donation.deleteMany({});
    await Volunteer.deleteMany({});
    await Contact.deleteMany({});
    console.log('Cleared existing data');

    // Insert sample data
    await Donation.insertMany(sampleDonations);
    console.log(`✓ Added ${sampleDonations.length} sample donations`);

    await Volunteer.insertMany(sampleVolunteers);
    console.log(`✓ Added ${sampleVolunteers.length} sample volunteers`);

    await Contact.insertMany(sampleContacts);
    console.log(`✓ Added ${sampleContacts.length} sample messages`);

    console.log('\n✅ Database seeded successfully!');
    console.log('Visit http://localhost:3000/admin to view the data');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();