const Joi = require('joi');

const createHelpdesk = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    message: Joi.string().required(),
  }),
};

module.exports.validation = { createHelpdesk };
