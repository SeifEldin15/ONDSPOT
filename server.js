const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const emailConfig = require('./email-config');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('.'));

// Email configuration
const transporter = nodemailer.createTransport({
  service: emailConfig.emailService,
  auth: {
    user: emailConfig.senderEmail,
    pass: emailConfig.senderPassword
  }
});

// Route to handle appointment booking
app.post('/book-appointment', async (req, res) => {
  console.log('Received booking request:', req.body);
  
  try {
    const { phone } = req.body;
    
    if (!phone) {
      console.log('No phone number provided');
      return res.status(400).json({ success: false, message: 'Phone number is required' });
    }

    console.log('Attempting to send email for phone:', phone);

    // Email options
    const mailOptions = {
      from: emailConfig.senderEmail,
      to: emailConfig.recipientEmail,
      subject: 'New Appointment Booking - ONDSPOT',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Appointment Booking
          </h2>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #007bff; margin-top: 0;">Customer Information:</h3>
            <p style="font-size: 16px; margin: 10px 0;">
              <strong>Phone Number:</strong> ${phone}
            </p>
          </div>
          <div style="background-color: #e9ecef; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <p style="margin: 0; font-size: 14px; color: #666;">
              This appointment booking was submitted through the ONDSPOT website.
            </p>
          </div>
        </div>
      `,
      text: `New Appointment Booking - Phone Number: ${phone}`
    };

    console.log('Sending email...');
    // Send email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
    
    res.json({ 
      success: true, 
      message: 'Appointment booking received! We will contact you soon.' 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to submit appointment booking. Please try again.' 
    });
  }
});

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
