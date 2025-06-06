const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const accountSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    accountType: {
      type: String,
      enum: ['demo', 'real'],
      required: true,
    },
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    amount: {
      type: Number,
      default: 0,
    },
    phone: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending',
    },
    accCreated: {
      type: String,
      enum: ['pending', 'done'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

accountSchema.plugin(toJSON);
accountSchema.plugin(paginate);

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
