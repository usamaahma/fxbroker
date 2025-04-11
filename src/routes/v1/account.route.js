const express = require('express');
const validate = require('../../middlewares/validate');
const accountValidation = require('../../validations/account.validation');
const accountController = require('../../controllers/account.controller');
const { sendEmail } = require('../../services/nodemailer.service'); // Fixed path

const router = express.Router();

// Protect all routes with authentication

router
  .route('/')
  .post(validate(accountValidation.createAccount), accountController.createAccount)
  .get(validate(accountValidation.getAccounts), accountController.getAccounts);

router.route('/user/:userId').get(validate(accountValidation.getAccountByUserId), accountController.getAccountByUserId);

router
  .route('/:accountId')
  .patch(validate(accountValidation.updateAccount), accountController.updateAccount)
  .delete(validate(accountValidation.deleteAccount), accountController.deleteAccount);

// Email endpoint with validation
router.post(
  '/send-account-email',
  validate(accountValidation.sendAccountEmail), // Add validation
  async (req, res) => {
    try {
      const { to, subject, text } = req.body;

      await sendEmail(to, subject, text);

      res.status(200).json({
        success: true,
        message: 'Email sent successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to send email',
        error: error.message, // Include error message for debugging
      });
    }
  }
);

module.exports = router;
