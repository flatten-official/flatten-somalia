const { gstore } = require('../datastore/db');

const { v4: uuidv4 } = require("uuid");
const moment = require("moment");

const accountSchema = new gstore.Schema({
    // TODO: add exclude from indices to these properties
    // TODO: add custom validation to each of these properties
    user_id: {type: String, default: () => uuidv4(),
        validate: {rule: 'isUUID', args: [4]}
        },
    // DATE?
    // default values
    // A list of tokens of the form {token_value: "", expiry: "YYYY-MM-DD"}
    tokens: {type: Array, default: []},
    cookies: {type: Array, default: []},
    hashed_emails: {type: Array, default: []},
    user_responses: {type: Object, default: {}},
    user_created: {type: Date, default: () => moment().valueOf()}
});

const Account = gstore.model('FlattenAccount', accountSchema);

module.exports = Account;
