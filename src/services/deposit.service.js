const Deposit = require('../models/deposit.model');

/**
 * Create a new deposit record
 * @param {Object} depositBody
 * @returns {Promise<Deposit>}
 */
const createDeposit = async (depositBody) => {
  return Deposit.create(depositBody);
};

/**
 * Get all deposit records with filtering and pagination
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<QueryResult>}
 */
const getDeposits = async (filter) => {
  return Deposit.find(filter); // 👈 Direct return kar diya
};

/**
 * Get a single deposit record by userId
 * @param {ObjectId} userId
 * @returns {Promise<Deposit>}
 */
const getDepositByUserId = async (userId) => {
  return Deposit.findOne({ userId });
};

/**
 * Update deposit details by depositId
 * @param {ObjectId} depositId
 * @param {Object} updateBody
 * @returns {Promise<Deposit>}
 */
const updateDeposit = async (depositId, updateBody) => {
  const deposit = await Deposit.findById(depositId);
  if (!deposit) {
    throw new Error('Deposit not found');
  }
  Object.assign(deposit, updateBody);
  await deposit.save();
  return deposit;
};

/**
 * Delete deposit record by depositId
 * @param {ObjectId} depositId
 * @returns {Promise<Deposit>}
 */
const deleteDeposit = async (depositId) => {
  const deposit = await Deposit.findById(depositId);
  if (!deposit) {
    throw new Error('Deposit not found');
  }
  await deposit.remove();
  return deposit;
};

module.exports = {
  createDeposit,
  getDeposits,
  getDepositByUserId,
  updateDeposit,
  deleteDeposit,
};
