const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService } = require('../services');
const ApiError = require('../utils/ApiError');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
});
const registerGoogle = catchAsync(async (req, res) => {
  const { email, name, googleId, role } = req.body;

  // Check if the user exists by email
  let user = await userService.getUserByEmail(email);

  if (!user) {
    // If user doesn't exist, create a new one
    user = await userService.createUser({
      email,
      name,
      googleId,
      role,
    });
  } else if (!user.googleId) {
    // If user exists but doesn't have a Google ID, link it
    user.googleId = googleId;
    await user.save();
  }

  // Generate auth tokens
  const tokens = await tokenService.generateAuthTokens(user);

  res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const { userId } = req.params;

  if (!userId) {
    throw new ApiError(400, 'User ID is missing in parameters');
  }
  const result = await authService.resetPassword(userId, currentPassword, newPassword);
  res.status(httpStatus.OK).send(result);
});

const resPassword = catchAsync(async (req, res) => {
  const { resetPasswordToken, newPassword } = req.body;
  const result = await authService.resPassword(resetPasswordToken, newPassword);
  res.status(httpStatus.OK).send(result);
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
  registerGoogle,
  resPassword,
};
