const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { depositService } = require('../services');

/**
 * Create a new deposit record
 */
const createDeposit = catchAsync(async (req, res) => {
  const deposit = await depositService.createDeposit(req.body);
  res.status(httpStatus.CREATED).send(deposit);
});

/**
 * Get all deposit records with filters & pagination
 */
const getDeposits = catchAsync(async (req, res) => {
  const deposits = await depositService.getDeposits(req.query, {
    page: req.query.page,
    limit: req.query.limit,
  });
  res.send(deposits);
});

/**
 * Get deposit details by userId
 */
const getDepositByUserId = catchAsync(async (req, res) => {
  const deposit = await depositService.getDepositByUserId(req.params.userId);
  if (!deposit) {
    return res.status(httpStatus.NOT_FOUND).send({ message: 'Deposit not found' });
  }
  res.send(deposit);
});

/**
 * Update deposit details by depositId
 */
const updateDeposit = catchAsync(async (req, res) => {
  const deposit = await depositService.updateDeposit(req.params.depositId, req.body);
  res.send(deposit);
});

/**
 * Delete deposit record by depositId
 */
const deleteDeposit = catchAsync(async (req, res) => {
  await depositService.deleteDeposit(req.params.depositId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createDeposit,
  getDeposits,
  getDepositByUserId,
  updateDeposit,
  deleteDeposit,
};
