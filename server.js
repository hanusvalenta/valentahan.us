// server.js
const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Route for the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Contact form submission endpoint
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  // Email message options
  const mailOptions = {
    from: email,
    to: 'hanus.valenta@gmail.com', // where you want to receive the emails
    subject: `New contact form submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ message: 'Failed to send email' });
    }
    console.log('Email sent:', info.response);
    res.status(200).json({ message: 'Email sent successfully!' });
  });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
