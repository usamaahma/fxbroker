const sendEmail = require('../services/nodemailer.service');

const sendCredentials = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required!' });
    }

    // Email bhejo
    await sendEmail(email, password);

    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending email', error: error.message });
  }
};

module.exports = { sendCredentials };
