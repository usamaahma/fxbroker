const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createDeposit = {
  body: Joi.object().keys({
    user: Joi.string().required().custom(objectId),
    image: Joi.string().required(),
    tradingAccountId: Joi.string().required(),
    amount: Joi.string().required(),
  }),
};

const getDeposits = {
  query: Joi.object().keys({
    user: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getDepositByUserId = {
  params: Joi.object().keys({
    userId: Joi.string().required().custom(objectId),
  }),
};

const updateDeposit = {
  params: Joi.object().keys({
    depositId: Joi.string().required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      image: Joi.string(),
      tradingAccountId: Joi.string(),
      amount: Joi.string(),
    })
    .min(1),
};

const deleteDeposit = {
  params: Joi.object().keys({
    depositId: Joi.string().required().custom(objectId),
  }),
};

module.exports = {
  createDeposit,
  getDeposits,
  getDepositByUserId,
  updateDeposit,
  deleteDeposit,
};
