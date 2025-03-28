const Depdraws = require('../models/depdraws.model');

/**
 * @param {Object} depdrawsBody
 * @returns {Promise<Depdraws>}
 */
const createDepdraws = async (depdrawsBody) => {
  return Depdraws.create(depdrawsBody);
};

/**
 * Get all Depdraws records with filtering and pagination
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<QueryResult>}
 */
const getDepdraws = async (filter, options) => {
  return Depdraws.paginate(filter, options);
};

/**
 * Get a single Depdraws record by userId
 * @param {ObjectId} userId
 * @returns {Promise<Depdraws>}
 */
const getDepdrawsByUserId = async (userId) => {
  return Depdraws.findOne({ userId });
};

/**
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<Depdraws>}
 */
const updateDepdraws = async (userId, updateBody) => {
  const depdraws = await getDepdrawsByUserId(userId);
  if (!depdraws) {
    throw new Error('Depdraws record not found');
  }
  Object.assign(depdraws, updateBody);
  await depdraws.save();
  return depdraws;
};

/**
 * Delete Depdraws record by userId
 * @param {ObjectId} userId
 * @returns {Promise<Depdraws>}
 */
const deleteDepdraws = async (userId) => {
  const depdraws = await getDepdrawsByUserId(userId);
  if (!depdraws) {
    throw new Error('Depdraws record not found');
  }
  await depdraws.remove();
  return depdraws;
};

module.exports = {
  createDepdraws,
  getDepdraws,
  getDepdrawsByUserId,
  updateDepdraws,
  deleteDepdraws,
};
