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
    limit: req.query.limit || 10000,
  });
  res.send(helpdeskEntries);
});

const deleteHelpdeskEntry = catchAsync(async (req, res) => {
  const { id } = req.params;
  const deletedEntry = await service.deleteHelpdeskEntry(id);

  if (!deletedEntry) {
    return res.status(httpStatus.NOT_FOUND).send({ message: 'Helpdesk entry not found' });
  }

  res.status(httpStatus.NO_CONTENT).send(); // 204 No Content
});

module.exports.controller = {
  createHelpdesk,
  getHelpdeskEntries,
  deleteHelpdeskEntry,
};
