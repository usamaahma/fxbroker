const express = require('express');
const { sendCredentials } = require('../../controllers/nodemailer.controller');

const router = express.Router();

router.post('/send-credentials', sendCredentials);

module.exports = router;
