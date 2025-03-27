const express = require('express');
const validate = require('../../middlewares/validate');
const depdrawsValidation = require('../../validations/depdraws.validation');
const depdrawsController = require('../../controllers/depdraws.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(depdrawsValidation.createDepdraws), depdrawsController.createDepdraws) // Depdraws create karega
  .get(validate(depdrawsValidation.getDepdraws), depdrawsController.getDepdraws); // Sab Depdraws records fetch karega

router
  .route('/:userId')
  .get(validate(depdrawsValidation.getDepdrawsByUserId), depdrawsController.getDepdrawsByUserId) // User ki Depdraws get karega
  .patch(validate(depdrawsValidation.updateDepdraws), depdrawsController.updateDepdraws) // Depdraws update karega
  .delete(validate(depdrawsValidation.deleteDepdraws), depdrawsController.deleteDepdraws); // Depdraws delete karega

module.exports = router;
