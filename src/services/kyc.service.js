const Kyc = require('../models/kyc.model');

/**
 * Create a new KYC record
 * @param {Object} kycBody
 * @returns {Promise<Kyc>}
 */
const createKyc = async (kycBody) => {
  return Kyc.create(kycBody);
};

/**
 * Get all KYC records with filtering and pagination
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<QueryResult>}
 */
const getKycs = async (filter, options) => {
  return Kyc.paginate(filter, options);
};

/**
 * Get a single KYC record by userId
 * @param {ObjectId} userId
 * @returns {Promise<Kyc>}
 */
const getKycByUserId = async (userId) => {
  return Kyc.findOne({ userId });
};

/**
 * Update KYC details by userId
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<Kyc>}
 */
const updateKyc = async (userId, updateBody) => {
  const kyc = await getKycByUserId(userId);
  if (!kyc) {
    throw new Error('KYC not found');
  }
  Object.assign(kyc, updateBody);
  await kyc.save();
  return kyc;
};

/**
 * Delete KYC record by userId
 * @param {ObjectId} userId
 * @returns {Promise<Kyc>}
 */
const deleteKyc = async (userId) => {
  const kyc = await getKycByUserId(userId);
  if (!kyc) {
    throw new Error('KYC not found');
  }
  await kyc.remove();
  return kyc;
};

module.exports = {
  createKyc,
  getKycs,
  getKycByUserId,
  updateKyc,
  deleteKyc,
};
