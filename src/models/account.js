const { gstore } = require('../datastore/db');

const { v4: uuidv4 } = require("uuid");

const accountSchema = new gstore.Schema({
    // TODO: add exclude from indices to these properties
    // TODO: add custom validation to each of these properties
    account_id: {type: String, validate: {rule: 'isUUID', args: [4]} },
    tokens: {type: Array, default: []},
    cookies: {type: Array, default: []},
    email: {type: Array, default: []},
    user_responses: {type: Object, default: {}},
    account_created: {type: Date, default: () => Date.now()}
});

const Account = gstore.model('FlattenAccount', accountSchema);

module.exports = Account;
