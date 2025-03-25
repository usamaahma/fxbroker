const express = require('express');
const validate = require('../../middlewares/validate');
const withdrawValidation = require('../../validations/withdraw.validation');
const withdrawController = require('../../controllers/withdraw.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(withdrawValidation.createWithdraw), withdrawController.createWithdraw)
  .get(validate(withdrawValidation.getWithdraws), withdrawController.getWithdraws);

router.route('/:userId').get(validate(withdrawValidation.getWithdrawByUserId), withdrawController.getWithdrawByUserId);

router
  .route('/:withdrawId')
  .patch(validate(withdrawValidation.updateWithdraw), withdrawController.updateWithdraw)
  .delete(validate(withdrawValidation.deleteWithdraw), withdrawController.deleteWithdraw);

module.exports = router;
