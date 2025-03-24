const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { accountService } = require('../services');

/**
 * Create a new Account record
 */
const createAccount = catchAsync(async (req, res) => {
  const account = await accountService.createAccount(req.body);
  res.status(httpStatus.CREATED).send(account);
});

/**
 * Get all Account records with filters & pagination
 */
const getAccounts = catchAsync(async (req, res) => {
  const accounts = await accountService.getAccounts(req.query, { page: req.query.page, limit: req.query.limit });
  res.send(accounts);
});

/**
 * Get Account details by userId
 */
const getAccountByUserId = catchAsync(async (req, res) => {
  const account = await accountService.getAccountByUserId(req.params.userId);
  if (!account) {
    return res.status(httpStatus.NOT_FOUND).send({ message: 'Account not found' });
  }
  res.send(account);
});

/**
 * Update Account details by userId
 */
const updateAccount = catchAsync(async (req, res) => {
  const account = await accountService.updateAccount(req.params.userId, req.body);
  res.send(account);
});

/**
 * Delete Account record by userId
 */
const deleteAccount = catchAsync(async (req, res) => {
  await accountService.deleteAccount(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createAccount,
  getAccounts,
  getAccountByUserId,
  updateAccount,
  deleteAccount,
};
