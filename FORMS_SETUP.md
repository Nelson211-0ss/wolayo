# Forms Email Setup Guide

## Overview
All forms on the Wolayo Child Restoration website now send submissions directly to **info@wolayo.org** using FormSubmit (a free form backend service).

## ✅ Forms Configured

### 1. **Contact Form** (`contact.html`)
- **Purpose**: General inquiries and messages
- **Email Subject**: "New Contact Form Submission - Wolayo"
- **Fields Collected**:
  - Full Name
  - Email Address
  - Subject
  - Message

### 2. **Newsletter Subscription** (`footer.js` - appears on all pages)
- **Purpose**: Newsletter sign-ups
- **Email Subject**: "New Newsletter Subscription - Wolayo"
- **Fields Collected**:
  - Email Address

### 3. **Volunteer Application Form** (`volunteer-application.html`)
- **Purpose**: Volunteer applications
- **Email Subject**: "New Volunteer Application - Wolayo"
- **Fields Collected**:
  - Personal Information (Name, Email, Phone, DOB, Address)
  - Availability & Preferences
  - Experience & Skills
  - Motivation
  - Terms & Conditions Acceptance

## 🔧 How It Works

### FormSubmit Service
- **Service**: [FormSubmit.co](https://formsubmit.co/)
- **Cost**: FREE
- **Setup**: No registration required (on first submission, you'll receive a confirmation email)
- **Features**:
  - Anti-spam (honeypot fields included)
  - Clean email templates
  - No CAPTCHA required
  - Works with static websites

### First-Time Setup
When someone submits a form for the first time:
1. FormSubmit will send a **confirmation email** to info@wolayo.org
2. **Click the confirmation link** in that email
3. After confirmation, all future form submissions will be sent directly without confirmation

## 📧 What You'll Receive

### Email Format
Each submission will arrive as a well-formatted table containing:
- **Subject Line**: Identifies which form was submitted
- **From**: The sender's email address
- **Content**: All form fields in an organized table format

### Example Email for Contact Form:
```
Subject: New Contact Form Submission - Wolayo
From: john@example.com

Name: John Doe
Email: john@example.com
Subject: Question about volunteering
Message: I would like to know more about volunteer opportunities...
```

## 🛡️ Security Features

### Spam Protection
- **Honeypot Fields**: Hidden fields that bots fill out (submissions with these filled are rejected)
- **CAPTCHA**: Disabled for better user experience
- **FormSubmit Filtering**: Service includes built-in spam detection

### Privacy
- No data is stored by FormSubmit
- Emails go directly to your inbox
- No third-party tracking

## 🎨 User Experience

### After Submission
- **Contact Form**: User is redirected to FormSubmit's default thank you page
- **Newsletter**: User is redirected to FormSubmit's default thank you page
- **Volunteer Form**: Submission is validated (must accept terms), then sent

### Customization Options (Optional)
You can customize the post-submission experience by adding these hidden fields to any form:

```html
<!-- Redirect to custom thank you page -->
<input type="hidden" name="_next" value="https://yourwebsite.com/thank-you.html">

<!-- Custom email template (requires FormSubmit Gold - paid) -->
<input type="hidden" name="_template" value="box">

<!-- Disable CAPTCHA (already done) -->
<input type="hidden" name="_captcha" value="false">

<!-- CC another email -->
<input type="hidden" name="_cc" value="support@wolayo.org">
```

## 📊 Form Tracking

### Recommended Setup
Consider setting up:
1. **Email Filters** in your email client to auto-label form submissions
2. **Spreadsheet Integration** (optional) - FormSubmit Gold offers Google Sheets integration
3. **Response Templates** for quick replies to common inquiries

### Email Filter Examples
In Gmail, you can create filters for:
- Subject contains "Contact Form" → Label: Contact Inquiries
- Subject contains "Newsletter" → Label: Newsletter Subscriptions  
- Subject contains "Volunteer Application" → Label: Volunteer Applications

## 🔄 Testing

### How to Test
1. Visit each page with a form
2. Fill out the form with test data
3. Submit the form
4. Check **info@wolayo.org** for:
   - Confirmation email (first time only)
   - Form submission email

### Test Checklist
- [ ] Contact form sends to info@wolayo.org
- [ ] Newsletter form sends to info@wolayo.org
- [ ] Volunteer application sends to info@wolayo.org
- [ ] All form fields are included in emails
- [ ] Email subject lines are correct
- [ ] No spam is getting through

## 📱 Mobile Compatibility
All forms are fully responsive and work on:
- Desktop browsers
- Mobile phones
- Tablets

## 🆘 Troubleshooting

### Not Receiving Emails?
1. **Check spam/junk folder** - FormSubmit emails might be filtered
2. **Verify confirmation** - Click the confirmation link in the first email
3. **Check email address** - Ensure info@wolayo.org is correct
4. **Wait a few minutes** - Delivery can take 1-5 minutes

### Form Not Submitting?
1. **Check required fields** - All fields marked with * must be filled
2. **Validate email format** - Email fields require valid email addresses
3. **Accept terms** - Volunteer form requires terms acceptance
4. **Check browser console** - Look for JavaScript errors

### Spam Issues?
1. **Add to safe senders** - Whitelist formsubmit.co
2. **Check honeypot** - Ensure _honey field is hidden
3. **Report spam** - Contact FormSubmit if getting spam

## 🔐 Backup Options

If FormSubmit ever has issues, you can switch to alternatives:

### Alternative Services
1. **Formspree** - formspree.io (similar to FormSubmit)
2. **Getform** - getform.io
3. **Basin** - usebasin.com
4. **EmailJS** - emailjs.com (JavaScript-based)

### To Switch Services
Simply update the `action` attribute in each form:
```html
<!-- Current -->
<form action="https://formsubmit.co/info@wolayo.org" method="POST">

<!-- Alternative (example: Formspree) -->
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

## 📞 Support

### FormSubmit Support
- Website: https://formsubmit.co
- Documentation: https://formsubmit.co/documentation
- Support: Contact via their website

### Technical Support
For issues with the forms themselves:
- Check this documentation
- Review browser console for errors
- Verify all form fields have `name` attributes
- Ensure forms have `method="POST"`

---

## ✨ Summary

✅ All forms configured to send to **info@wolayo.org**
✅ Spam protection enabled
✅ Mobile-friendly
✅ No backend required
✅ Free service
✅ Easy to test and maintain

**Next Steps:**
1. Test each form by submitting sample data
2. Confirm your email address (first submission only)
3. Set up email filters for organization
4. Monitor submissions and respond promptly

Good luck with your Wolayo Child Restoration initiative! 🌟

