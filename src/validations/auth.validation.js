const Joi = require('joi');
const { password } = require('./custom.validation');

const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    phonenumber: Joi.string().required(),
    role: Joi.string().required(),
  }),
};
const registerGoogle = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required(),
    googleId: Joi.string().required(), // Unique Google ID from Google OAuth
    role: Joi.string().optional().default('user'), // Default to 'user' if not provided
  }),
};
const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const resetPassword = {
  params: Joi.object().keys({
    userId: Joi.string().required(), // Validating userId in URL params
  }),
  body: Joi.object().keys({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().required().custom(password), // Custom password validation
  }),
};
const resPassword = {
  body: Joi.object().keys({
    resetPasswordToken: Joi.string().required(),
    newPassword: Joi.string().required().custom(password), // Custom password validation
  }),
};

const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
  registerGoogle,
  resPassword,
};
