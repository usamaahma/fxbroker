const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const kycSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    proofOfIdentity: [
      {
        type: String, // Image URLs
        required: false, // Initially optional
      },
    ],
    proofOfAddress: {
      type: String,
      required: false, // Initially optional
      trim: true,
    },
    bankDetails: {
      accountHolder: {
        type: String,
        trim: true,
      },
      bankName: {
        type: String,
        trim: true,
      },
      accountNumber: {
        type: String,
        trim: true,
      },
      ibanNumber: {
        type: String,
        trim: true,
      },
    },
    status: {
      type: String,
      enum: ['pending', 'verified'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

kycSchema.plugin(toJSON);
kycSchema.plugin(paginate);

const Kyc = mongoose.model('Kyc', kycSchema);

module.exports = Kyc;
