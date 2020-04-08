const { gstore } = require('../datastore/db');

const emailSchema = new gstore.Schema({
    email: {type: String, validate: 'isEmail' },
    submission_times: {type: Array, default: []},
    latest: {type: Number},
    created: { type: Number, default: () => Date.now() },
});

const Email = gstore.model('FlattenMarketing', emailSchema);

module.exports = Email;
