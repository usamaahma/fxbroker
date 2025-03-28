const Account = require('../models/account.model');

/**
 * Create a new Account record
 * @param {Object} accountBody
 * @returns {Promise<Account>}
 */
const createAccount = async (accountBody) => {
  return Account.create(accountBody);
};

/**
 * Get all Account records with filtering and pagination
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<QueryResult>}
 */
const getAccounts = async (filter) => {
  return Account.find(filter);
};

/**
 * Get a single Account record by userId
 * @param {ObjectId} userId
 * @returns {Promise<Account>}
 */
const getAccountByUserId = async (userId) => {
  return Account.findOne({ userId });
};

/**
 * Update Account details by userId
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<Account>}
 */
const updateAccount = async (userId, updateBody) => {
  const account = await getAccountByUserId(userId);
  if (!account) {
    throw new Error('Account not found');
  }
  Object.assign(account, updateBody);
  await account.save();
  return account;
};

/**
 * Delete Account record by userId
 * @param {ObjectId} userId
 * @returns {Promise<Account>}
 */
const deleteAccount = async (userId) => {
  const account = await getAccountByUserId(userId);
  if (!account) {
    throw new Error('Account not found');
  }
  await account.remove();
  return account;
};

module.exports = {
  createAccount,
  getAccounts,
  getAccountByUserId,
  updateAccount,
  deleteAccount,
};
