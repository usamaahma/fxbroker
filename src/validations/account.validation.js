const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createAccount = {
  body: Joi.object().keys({
    userId: Joi.string().required().custom(objectId),
    accountType: Joi.string().valid('demo', 'real').required(),
    name: Joi.string().trim(),
    email: Joi.string().email().trim(),
    amount: Joi.number().min(0),
    phone: Joi.string().trim(),
    country: Joi.string().trim(),
  }),
};

const getAccounts = {
  query: Joi.object().keys({
    userId: Joi.string().custom(objectId),
    accountType: Joi.string().valid('demo', 'real'),
    sortBy: Joi.string(),
    page: Joi.number().integer(),
  }),
};

const getAccountByUserId = {
  params: Joi.object().keys({
    userId: Joi.string().required().custom(objectId),
  }),
};

const updateAccount = {
  params: Joi.object().keys({
    userId: Joi.string().required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      accountType: Joi.string().valid('demo', 'real'),
      name: Joi.string().trim(),
      email: Joi.string().email().trim(),
      amount: Joi.number().min(0),
      phone: Joi.string().trim(),
      country: Joi.string().trim(),
    })
    .min(1), // At least one field must be provided for update
};

const deleteAccount = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createAccount,
  getAccounts,
  getAccountByUserId,
  updateAccount,
  deleteAccount,
};
