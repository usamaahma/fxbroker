const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const depdrawsSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    deposit: {
      type: Number,
      required: false,
    },
    withdraw: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

depdrawsSchema.plugin(toJSON);
depdrawsSchema.plugin(paginate);

const Depdraws = mongoose.model('Depdraws', depdrawsSchema);

module.exports = Depdraws;
