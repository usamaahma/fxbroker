const express = require('express');
const { generateSignature } = require('../../controllers/upload.controller');

const router = express.Router();

// Cloudinary signature route
router.get('/generate-signature', generateSignature);

module.exports = router;
