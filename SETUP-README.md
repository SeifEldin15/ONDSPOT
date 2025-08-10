# ONDSPOT Appointment Booking System

This system allows customers to book appointments by submitting their phone number, which is then emailed to your specified email address.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Email Settings

Edit the `email-config.js` file and update the following:

```javascript
module.exports = {
  emailService: 'gmail',
  senderEmail: 'your-sender-email@gmail.com', // Replace with your sender email
  senderPassword: 'your-app-password',         // Replace with your Gmail app password
  recipientEmail: 'Dspoton843@gmail.com'      // Already set to your email
};
```

### 3. Gmail App Password Setup

To get a Gmail App Password:

1. Go to your Google Account settings (https://myaccount.google.com/)
2. Select **Security** from the left menu
3. Under "Signing in to Google," select **2-Step Verification** (enable if not already enabled)
4. Scroll down and select **App passwords**
5. Select "Other (custom name)" and enter "ONDSPOT Booking"
6. Copy the generated 16-character password
7. Use this password in the `email-config.js` file

### 4. Start the Server

```bash
npm start
```

The server will run on http://localhost:3000

### 5. Test the Form

1. Open http://localhost:3000 in your browser
2. Scroll down to the "Book an appointment" section
3. Enter a phone number and click "Schedule Now"
4. Check your email at Dspoton843@gmail.com for the appointment notification

## How It Works

1. Customer fills out the phone number in the booking form
2. JavaScript prevents the default form submission and sends data to `/book-appointment` endpoint
3. Node.js server receives the phone number and sends an email using Nodemailer
4. Email is sent to Dspoton843@gmail.com with the customer's phone number
5. Customer sees a success message on the website

## Files Modified

- `index.html` - Updated the booking form and added JavaScript handler
- `server.js` - Created Node.js server with email functionality
- `package.json` - Added dependencies
- `email-config.js` - Email configuration file

## Troubleshooting

- If emails aren't sending, check your Gmail app password
- Make sure 2-factor authentication is enabled on your Gmail account
- Check the server console for error messages
- Ensure port 3000 is available
