const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendEmail = async (to, subject, htmlContent) => {
  try {
    let info = await transporter.sendMail({
      from: '"Your Company" <your-email@gmail.com>',
      to: to,
      subject: subject,
      html: htmlContent
    });
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendEmail;
