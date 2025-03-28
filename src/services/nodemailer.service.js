const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = (email, password) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Support Team" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your Account Credentials for Third Website',
    html: `<p>Hi,</p>
           <p>Your account has been created successfully on the third-party website.</p>
           <p><b>Email:</b> ${email}</p>
           <p><b>Password:</b> ${password}</p>
           <p>You can now log in using these credentials.</p>
           <p>Thanks,</p>`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
