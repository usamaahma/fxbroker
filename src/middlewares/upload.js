const multer = require('multer');

const storage = multer.memoryStorage(); // Store in buffer
const upload = multer({ storage });

module.exports = upload;
