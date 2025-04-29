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
  const accounts = await accountService.getAccounts(req.query);
  res.send(accounts);
});

/**
 * Get Account details by accountId
 */
const getAccountById = catchAsync(async (req, res) => {
  const account = await accountService.getAccountById(req.params.accountId);
  if (!account) {
    return res.status(httpStatus.NOT_FOUND).send({ message: 'Account not found' });
  }
  res.send(account);
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
 * Update Account details by accountId
 */
const updateAccount = catchAsync(async (req, res) => {
  const account = await accountService.updateAccount(req.params.accountId, req.body);
  res.send(account);
});

/**
 * Delete Account record by accountId
 */
const deleteAccount = catchAsync(async (req, res) => {
  await accountService.deleteAccount(req.params.accountId);
  res.status(httpStatus.NO_CONTENT).send();
});

/**
 * Delete all Account records
 */
const deleteAllAccounts = catchAsync(async (req, res) => {
  await accountService.deleteAllAccounts();
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createAccount,
  getAccounts,
  getAccountById,
  updateAccount,
  deleteAccount,
  getAccountByUserId,
  deleteAllAccounts,
};
