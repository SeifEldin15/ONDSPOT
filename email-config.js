// Email Configuration
// To use this, you need to:
// 1. Create a Gmail account or use an existing one as the sender
// 2. Enable 2-factor authentication on that account
// 3. Generate an "App Password" for this application
// 4. Update the credentials below

module.exports = {
  emailService: 'gmail',
  senderEmail: 'Dspoton843@gmail.com', // Replace with your sender email
  senderPassword: 'plme qrmi rlji krdq',         // Replace with your Gmail app password
  recipientEmail: 'Dspoton843@gmail.com'      // Your email where appointments will be sent
};

/* 
Instructions to get Gmail App Password:
1. Go to your Google Account settings
2. Select Security
3. Under "Signing in to Google," select 2-Step Verification
4. At the bottom, select App passwords
5. Select the app and device you want to generate the app password for
6. Follow the instructions to enter the app password
*/
