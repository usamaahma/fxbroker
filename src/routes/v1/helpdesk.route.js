const express = require('express');
const validate = require('../../middlewares/validate');
const { validation } = require('../../validations/helpdesk.validation');
const { controller } = require('../../controllers/helpdesk.controller');

const router = express.Router();

router.route('/').post(validate(validation.createHelpdesk), controller.createHelpdesk).get(controller.getHelpdeskEntries);

// 🔥 DELETE route for deleting helpdesk entry by ID
router.route('/:id').delete(controller.deleteHelpdeskEntry);

module.exports = router;
