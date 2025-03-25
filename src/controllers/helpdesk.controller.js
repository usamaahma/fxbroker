const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { service } = require('../services/helpdesk.service');

const createHelpdesk = catchAsync(async (req, res) => {
  const helpdeskEntry = await service.createHelpdeskEntry(req.body);
  res.status(httpStatus.CREATED).send(helpdeskEntry);
});

const getHelpdeskEntries = catchAsync(async (req, res) => {
  const helpdeskEntries = await service.getHelpdeskEntries(req.query, {
    page: req.query.page || 0,
    limit: req.query.limit || 10,
  });
  res.send(helpdeskEntries);
});

module.exports.controller = { createHelpdesk, getHelpdeskEntries };
