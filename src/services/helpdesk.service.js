const Helpdesk = require('../models/helpdesk.model');

const createHelpdeskEntry = async (helpdeskBody) => {
  return Helpdesk.create(helpdeskBody);
};

const getHelpdeskEntries = async (filter, options) => {
  return Helpdesk.find(filter)
    .limit(options.limit)
    .skip(options.page * options.limit);
};

module.exports.service = { createHelpdeskEntry, getHelpdeskEntries };
