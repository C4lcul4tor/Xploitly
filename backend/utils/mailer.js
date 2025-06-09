// utils/mailer.js
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

const sendConfirmationEmail = async (to, name) => {
  await transporter.sendMail({
    from: `"Xploitly" <${process.env.GMAIL_USER}>`,
    to,
    subject: 'Thanks for reaching out to Xploitly!',
    text: `Hi ${name},\n\nThanks for contacting us! We'll get back to you shortly.\n\n— The Xploitly Team`,
  });
};

module.exports = { sendConfirmationEmail };
