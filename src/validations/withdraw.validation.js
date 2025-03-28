const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createWithdraw = {
  body: Joi.object().keys({
    userId: Joi.string().required().custom(objectId),
    tradingAccountId: Joi.string().required(),
    accountNumber: Joi.string().required(),
    accountName: Joi.string().required(),
    amount: Joi.number().required(),
  }),
};

const getWithdraws = {
  query: Joi.object().keys({
    userId: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getWithdrawByUserId = {
  params: Joi.object().keys({
    userId: Joi.string().required().custom(objectId),
  }),
};

const updateWithdraw = {
  params: Joi.object().keys({
    withdrawId: Joi.string().required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      tradingAccountId: Joi.string(),
      accountNumber: Joi.string(),
      accountName: Joi.string(),
      amount: Joi.number(),
    })
    .min(1),
};

const deleteWithdraw = {
  params: Joi.object().keys({
    withdrawId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createWithdraw,
  getWithdraws,
  getWithdrawByUserId,
  updateWithdraw,
  deleteWithdraw,
};
