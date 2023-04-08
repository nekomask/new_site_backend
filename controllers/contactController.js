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

  // Configure your email settings
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MY_EMAIL, // your email address
      pass: process.env.MY_PW, // your email password
    },
  });

  const mailOptions = {
    from: email,
    to: 'volaju@gmail.com', // your email address
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
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