const express = require('express');
const validate = require('../../middlewares/validate');
const depositValidation = require('../../validations/deposit.validation');
const depositController = require('../../controllers/deposit.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(depositValidation.createDeposit), depositController.createDeposit)
  .get(validate(depositValidation.getDeposits), depositController.getDeposits);

router.route('/:userId').get(validate(depositValidation.getDepositByUserId), depositController.getDepositByUserId);

router
  .route('/:depositId')
  .patch(validate(depositValidation.updateDeposit), depositController.updateDeposit)
  .delete(validate(depositValidation.deleteDeposit), depositController.deleteDeposit);

module.exports = router;
