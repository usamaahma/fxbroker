const Joi = require('joi');

const createHelpdesk = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    message: Joi.string().required(),
  }),
};

const deleteHelpdesk = {
  params: Joi.object().keys({
    id: Joi.string().required(), // Assuming it's a string (like MongoDB ObjectId)
  }),
};

module.exports.validation = { createHelpdesk, deleteHelpdesk };
