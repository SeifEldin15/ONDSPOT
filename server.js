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

// Route to handle PPF quote requests
app.post('/ppf-quote', async (req, res) => {
  console.log('Received PPF quote request:', req.body);
  
  try {
    const { name, phone, vehicle, appointmentDate, services } = req.body;
    
    if (!name || !phone || !vehicle) {
      console.log('Missing required fields');
      return res.status(400).json({ success: false, message: 'Name, phone, and vehicle information are required' });
    }

    console.log('Attempting to send PPF quote email');

    // Email options
    const mailOptions = {
      from: emailConfig.senderEmail,
      to: emailConfig.recipientEmail,
      subject: 'New PPF Quote Request - ONDSPOT',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New PPF Quote Request
          </h2>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #007bff; margin-top: 0;">Customer Information:</h3>
            <p style="font-size: 16px; margin: 10px 0;">
              <strong>Name:</strong> ${name}
            </p>
            <p style="font-size: 16px; margin: 10px 0;">
              <strong>Phone Number:</strong> ${phone}
            </p>
            <p style="font-size: 16px; margin: 10px 0;">
              <strong>Vehicle:</strong> ${vehicle}
            </p>
            ${appointmentDate ? `<p style="font-size: 16px; margin: 10px 0;">
              <strong>Preferred Appointment Date:</strong> ${appointmentDate}
            </p>` : ''}
            ${services ? `<p style="font-size: 16px; margin: 10px 0;">
              <strong>Services Requested:</strong><br>
              ${services.replace(/\n/g, '<br>')}
            </p>` : ''}
          </div>
          <div style="background-color: #e9ecef; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <p style="margin: 0; font-size: 14px; color: #666;">
              This PPF quote request was submitted through the ONDSPOT website PPF page.
            </p>
          </div>
        </div>
      `,
      text: `New PPF Quote Request - Name: ${name}, Phone: ${phone}, Vehicle: ${vehicle}${appointmentDate ? ', Appointment Date: ' + appointmentDate : ''}${services ? ', Services: ' + services : ''}`
    };

    console.log('Sending PPF quote email...');
    // Send email
    await transporter.sendMail(mailOptions);
    console.log('PPF quote email sent successfully!');
    
    res.json({ 
      success: true, 
      message: 'Quote request received! We will contact you within 24 hours with your personalized quote.' 
    });

  } catch (error) {
    console.error('Error sending PPF quote email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to submit quote request. Please try again.' 
    });
  }
});

// Route to handle service quote requests (for all services)
app.post('/service-quote', async (req, res) => {
  console.log('Received service quote request:', req.body);
  
  try {
    const { name, phone, vehicle, appointmentDate, services, serviceType } = req.body;
    
    if (!name || !phone || !vehicle || !serviceType) {
      console.log('Missing required fields');
      return res.status(400).json({ success: false, message: 'Name, phone, vehicle information, and service type are required' });
    }

    console.log('Attempting to send service quote email for:', serviceType);

    // Email options
    const mailOptions = {
      from: emailConfig.senderEmail,
      to: emailConfig.recipientEmail,
      subject: `New ${serviceType} Quote Request - ONDSPOT`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New ${serviceType} Quote Request
          </h2>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #007bff; margin-top: 0;">Customer Information:</h3>
            <p style="font-size: 16px; margin: 10px 0;">
              <strong>Name:</strong> ${name}
            </p>
            <p style="font-size: 16px; margin: 10px 0;">
              <strong>Phone Number:</strong> ${phone}
            </p>
            <p style="font-size: 16px; margin: 10px 0;">
              <strong>Vehicle:</strong> ${vehicle}
            </p>
            <p style="font-size: 16px; margin: 10px 0;">
              <strong>Service Type:</strong> ${serviceType}
            </p>
            ${appointmentDate ? `<p style="font-size: 16px; margin: 10px 0;">
              <strong>Preferred Appointment Date:</strong> ${appointmentDate}
            </p>` : ''}
            ${services ? `<p style="font-size: 16px; margin: 10px 0;">
              <strong>Services Requested:</strong><br>
              ${services.replace(/\n/g, '<br>')}
            </p>` : ''}
          </div>
          <div style="background-color: #e9ecef; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <p style="margin: 0; font-size: 14px; color: #666;">
              This ${serviceType.toLowerCase()} quote request was submitted through the ONDSPOT website.
            </p>
          </div>
        </div>
      `,
      text: `New ${serviceType} Quote Request - Name: ${name}, Phone: ${phone}, Vehicle: ${vehicle}${appointmentDate ? ', Appointment Date: ' + appointmentDate : ''}${services ? ', Services: ' + services : ''}`
    };

    console.log('Sending service quote email...');
    // Send email
    await transporter.sendMail(mailOptions);
    console.log('Service quote email sent successfully!');
    
    res.json({ 
      success: true, 
      message: 'Quote request received! We will contact you within 24 hours with your personalized quote.' 
    });

  } catch (error) {
    console.error('Error sending service quote email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to submit quote request. Please try again.' 
    });
  }
});

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

