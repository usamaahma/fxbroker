const express = require('express');
const validate = require('../../middlewares/validate');
const accountValidation = require('../../validations/account.validation');
const accountController = require('../../controllers/account.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(accountValidation.createAccount), accountController.createAccount) // نیا اکاؤنٹ بنائے گا
  .get(validate(accountValidation.getAccounts), accountController.getAccounts); // سب اکاؤنٹس نکالے گا

router.route('/user/:userId').get(validate(accountValidation.getAccountByUserId), accountController.getAccountByUserId); // مخصوص userId کا اکاؤنٹ حاصل کرے گا

router
  .route('/:accountId')
  .patch(validate(accountValidation.updateAccount), accountController.updateAccount) // اکاؤنٹ اپڈیٹ کرے گا
  .delete(validate(accountValidation.deleteAccount), accountController.deleteAccount); // اکاؤنٹ ڈیلیٹ کرے گا

module.exports = router;
