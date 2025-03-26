const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { withdrawService } = require('../services');

/**
 * Create a new withdraw record
 */
const createWithdraw = catchAsync(async (req, res) => {
  const withdraw = await withdrawService.createWithdraw(req.body);
  res.status(httpStatus.CREATED).send(withdraw);
});

/**
 * Get all withdraw records with filters & pagination
 */
const getWithdraws = catchAsync(async (req, res) => {
  const withdraws = await withdrawService.getWithdraws(req.query, {
    page: req.query.page,
    limit: req.query.limit,
  });
  res.send(withdraws);
});

/**
 * Get withdraw details by userId
 */
const getWithdrawByUserId = catchAsync(async (req, res) => {
  const withdraw = await withdrawService.getWithdrawByUserId(req.params.userId);
  if (!withdraw) {
    return res.status(httpStatus.NOT_FOUND).send({ message: 'Withdraw not found' });
  }
  res.send(withdraw);
});

/**
 * Update withdraw details by withdrawId
 */
const updateWithdraw = catchAsync(async (req, res) => {
  const withdraw = await withdrawService.updateWithdraw(req.params.withdrawId, req.body);
  res.send(withdraw);
});

/**
 * Delete withdraw record by withdrawId
 */
const deleteWithdraw = catchAsync(async (req, res) => {
  await withdrawService.deleteWithdraw(req.params.withdrawId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createWithdraw,
  getWithdraws,
  getWithdrawByUserId,
  updateWithdraw,
  deleteWithdraw,
};
