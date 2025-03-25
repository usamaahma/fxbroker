const crypto = require('crypto');
const express = require('express');

const router = express.Router();
require('dotenv').config();

router.get('/generate-signature', (req, res) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const folder = 'deposits';

  const uploadPreset = 'jadeedskills';
  const stringToSign = `folder=${folder}&timestamp=${timestamp}&upload_preset=${uploadPreset}`;
  const signature = crypto.createHmac('sha1', process.env.CLOUDINARY_API_SECRET).update(stringToSign).digest('hex');

  res.json({
    timestamp,
    signature,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
  });
});

module.exports = router;
