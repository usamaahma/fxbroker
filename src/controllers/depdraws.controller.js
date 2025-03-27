const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { depdrawsService } = require('../services');

/**
 * Create a new Depdraws record
 */
const createDepdraws = catchAsync(async (req, res) => {
  const depdraws = await depdrawsService.createDepdraws(req.body);
  res.status(httpStatus.CREATED).send(depdraws);
});

/**
 * Get all Depdraws records
 */
const getDepdraws = catchAsync(async (req, res) => {
  const depdraws = await depdrawsService.getDepdraws(req.query, req.query);
  res.send(depdraws);
});

/**
 * Get Depdraws record by userId
 */
const getDepdrawsByUserId = catchAsync(async (req, res) => {
  const depdraws = await depdrawsService.getDepdrawsByUserId(req.params.userId);
  if (!depdraws) {
    return res.status(httpStatus.NOT_FOUND).send({ message: 'Depdraws record not found' });
  }
  res.send(depdraws);
});

/**
 * Update Depdraws record by userId
 */
const updateDepdraws = catchAsync(async (req, res) => {
  const depdraws = await depdrawsService.updateDepdraws(req.params.userId, req.body);
  res.send(depdraws);
});

/**
 * Delete Depdraws record by userId
 */
const deleteDepdraws = catchAsync(async (req, res) => {
  await depdrawsService.deleteDepdraws(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createDepdraws,
  getDepdraws,
  getDepdrawsByUserId,
  updateDepdraws,
  deleteDepdraws,
};
