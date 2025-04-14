const Withdraw = require('../models/withdraw.model');

/**
 * Create a new withdraw record
 * @param {Object} withdrawBody
 * @returns {Promise<Withdraw>}
 */
const createWithdraw = async (withdrawBody) => {
  return Withdraw.create(withdrawBody);
};

/**
 * Get all withdraw records with filtering and pagination
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<QueryResult>}
 */
const getWithdraws = async (filter, options) => {
  return Withdraw.paginate(filter, options);
};

/**
 * Get a single withdraw record by userId
 * @param {ObjectId} userId
 * @returns {Promise<Withdraw>}
 */
const getWithdrawByUserId = async (userId) => {
  return Withdraw.find({ userId });
};

/**
 * Update withdraw details by withdrawId
 * @param {ObjectId} withdrawId
 * @param {Object} updateBody
 * @returns {Promise<Withdraw>}
 */
const updateWithdraw = async (withdrawId, updateBody) => {
  const withdraw = await Withdraw.findById(withdrawId);
  if (!withdraw) {
    throw new Error('Withdraw not found');
  }
  Object.assign(withdraw, updateBody);
  await withdraw.save();
  return withdraw;
};

/**
 * Delete withdraw record by withdrawId
 * @param {ObjectId} withdrawId
 * @returns {Promise<Withdraw>}
 */
const deleteWithdraw = async (withdrawId) => {
  const withdraw = await Withdraw.findById(withdrawId);
  if (!withdraw) {
    throw new Error('Withdraw not found');
  }
  await withdraw.remove();
  return withdraw;
};

module.exports = {
  createWithdraw,
  getWithdraws,
  getWithdrawByUserId,
  updateWithdraw,
  deleteWithdraw,
};
