const { gstore } = require('../datastore/db');

const moment = require('moment');

const emailSchema = new gstore.Schema({
    email: {type: String, validate: 'isEmail' },
    submission_times: {type: Array, default: []},
});

const Email = gstore.model('FlattenMarketing', emailSchema);

module.exports = Email;
