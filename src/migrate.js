const { Datastore } = require("@google-cloud/datastore");

const { gstore } = require("./datastore/db");

const googleData = require("./datastore/accounts");

const query = gstore.ds.createQuery('form-user');

migrate = async () => {
  [entities] = await gstore.ds.runQuery(query).catch(console.error);

  let i = 0;
  let start = Date.now();
  for (var entity  of entities) {
    ++i;
    await googleData.migrate(entity);
    if ((i % 1000) === 0) {
      console.log(`${i} - ${(Date.now()-start)/1000}s`);
    }
  }
};

migrate();
