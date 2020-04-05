// db.js
const { Gstore } = require('gstore-node');
const { Datastore } = require("@google-cloud/datastore");

const gstore = new Gstore();
const datastore = new Datastore({ namespace: process.env.DATASTORE_NAMESPACE});

gstore.connect(datastore);

module.exports = { gstore };