const express = require('express');
const validate = require('../../middlewares/validate');
const kycValidation = require('../../validations/kyc.validation');
const kycController = require('../../controllers/kyc.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(kycValidation.createKyc), kycController.createKyc) // KYC create karega
  .get(validate(kycValidation.getKycs), kycController.getKycs); // Sab KYC records fetch karega

router
  .route('/:userId')
  .get(validate(kycValidation.getKycByUserId), kycController.getKycByUserId) // User ki KYC get karega
  .patch(validate(kycValidation.updateKyc), kycController.updateKyc) // KYC update karega
  .delete(validate(kycValidation.deleteKyc), kycController.deleteKyc); // KYC delete karega

module.exports = router;
