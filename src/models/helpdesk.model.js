const mongoose = require('mongoose');

const helpdeskSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Helpdesk = mongoose.model('Helpdesk', helpdeskSchema);
module.exports = Helpdesk;
