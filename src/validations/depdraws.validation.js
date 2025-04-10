const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createDepdraws = {
  body: Joi.object().keys({
    userId: Joi.string().required().custom(objectId),
    email: Joi.string().email().required(),
    deposit: Joi.number().optional(),
    withdraw: Joi.number().optional(),
  }),
};

const getDepdraws = {
  query: Joi.object().keys({
    userId: Joi.string().custom(objectId),
    email: Joi.string().email(),
    sortBy: Joi.string(),
    page: Joi.number().integer(),
  }),
};

const getDepdrawsByUserId = {
  params: Joi.object().keys({
    userId: Joi.string().required().custom(objectId),
  }),
};

const updateDepdraws = {
  params: Joi.object().keys({
    userId: Joi.string().required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      deposit: Joi.number().optional(),
      withdraw: Joi.number().optional(),
    })
    .min(1),
};

const deleteDepdraws = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createDepdraws,
  getDepdraws,
  getDepdrawsByUserId,
  updateDepdraws,
  deleteDepdraws,
};
