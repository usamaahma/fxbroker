const express = require('express');
const upload = require('../../middlewares/upload'); // Multer middleware
const cloudinary = require('../../config/cloudinary');

const router = express.Router();

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream({ folder: 'products' }, (error, cloudinaryResult) => {
        if (error) reject(error);
        else resolve(cloudinaryResult);
      });
      uploadStream.end(req.file.buffer);
    });

    res.json({ imageUrl: result.secure_url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
