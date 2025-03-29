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
 * @returns {Promise<QueryResult>}
 */
const getAccounts = async (filter) => {
  return Account.find(filter);
};

/**
 * Get a single Account record by accountId
 * @param {ObjectId} accountId
 * @returns {Promise<Account>}
 */
const getAccountById = async (accountId) => {
  return Account.findById(accountId);
};
const getAccountByUserId = async (userId) => {
  return Account.findOne({ userId });
};

/**
 * Update Account details by accountId
 * @param {ObjectId} accountId
 * @param {Object} updateBody
 * @returns {Promise<Account>}
 */
const updateAccount = async (accountId, updateBody) => {
  const account = await getAccountById(accountId);
  if (!account) {
    throw new Error('Account not found');
  }
  Object.assign(account, updateBody);
  await account.save();
  return account;
};

/**
 * Delete Account record by accountId
 * @param {ObjectId} accountId
 * @returns {Promise<Account>}
 */
const deleteAccount = async (accountId) => {
  const account = await getAccountById(accountId);
  if (!account) {
    throw new Error('Account not found');
  }
  await account.remove();
  return account;
};

module.exports = {
  createAccount,
  getAccounts,
  getAccountById,
  getAccountByUserId,
  updateAccount,
  deleteAccount,
};
