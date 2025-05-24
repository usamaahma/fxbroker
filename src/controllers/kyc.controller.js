const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { kycService } = require('../services');

/**
 * Create a new KYC record
 */
const createKyc = catchAsync(async (req, res) => {
  const kyc = await kycService.createKyc(req.body);
  res.status(httpStatus.CREATED).send(kyc);
});

/**
 * Get all KYC records with filters & pagination
 */
const getKycs = catchAsync(async (req, res) => {
  const kycs = await kycService.getKycs(req.query, { page: req.query.page });
  res.send(kycs);
});

/**
 * Get KYC details by userId
 */
const getKycByUserId = catchAsync(async (req, res) => {
  const kyc = await kycService.getKycByUserId(req.params.userId);
  if (!kyc) {
    return res.status(httpStatus.NOT_FOUND).send({ message: 'KYC not found' });
  }
  res.send(kyc);
});

/**
 * Update KYC details by userId
 */
const updateKyc = catchAsync(async (req, res) => {
  const kyc = await kycService.updateKyc(req.params.userId, req.body);
  res.send(kyc);
});

/**
 * Delete KYC record by userId
 */
const deleteKyc = catchAsync(async (req, res) => {
  await kycService.deleteKyc(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createKyc,
  getKycs,
  getKycByUserId,
  updateKyc,
  deleteKyc,
};
