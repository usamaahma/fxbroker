const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createKyc = {
  body: Joi.object().keys({
    userId: Joi.string().required().custom(objectId),
    proofOfIdentity: Joi.array().items(Joi.string()), // Array of image URLs
    bankDetails: Joi.object().keys({
      accountHolder: Joi.string(),
      bankName: Joi.string(),
      accountNumber: Joi.string(),
      ibanNumber: Joi.string(),
    }),
    status: Joi.string(),
  }),
};

const getKycs = {
  query: Joi.object().keys({}),
};

const getKycByUserId = {
  params: Joi.object().keys({
    userId: Joi.string().required().custom(objectId),
  }),
};

const updateKyc = {
  params: Joi.object().keys({
    userId: Joi.string().required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      proofOfIdentity: Joi.array().items(Joi.string()),
      bankDetails: Joi.object().keys({
        accountHolder: Joi.string(),
        bankName: Joi.string(),
        accountNumber: Joi.string(),
        ibanNumber: Joi.string(),
      }),
      status: Joi.string(),
    })
    .min(1),
};

const deleteKyc = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createKyc,
  getKycs,
  getKycByUserId,
  updateKyc,
  deleteKyc,
};
