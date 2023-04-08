const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  // Validate the input
  if (!name || !email || !message) {
    res.status(400).json({ error: 'All fields are required.' });
    return;
  }

  // Configuring email settings
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MY_EMAIL, 
      pass: process.env.MY_PW, 
    },
  });

  //Setting up template for emails sent through Contact form
  const mailOptions = {
    from: email,
    to: 'volaju@gmail.com', 
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    html: `
    <div style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5; color: #333;">
      <h1 style="font-size: 24px;">New Contact Form Submission</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <div style="border-left: 3px solid #ccc; padding-left: 10px; margin: 10px 0;">
        ${message.split('\n').join('<br>')}
      </div>
    </div>
  `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'An error occurred. Please try again.' });
  }
});

module.exports = router;