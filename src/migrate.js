const { Datastore } = require("@google-cloud/datastore");

const { gstore } = require("./datastore/db");

const googleData = require("./datastore/accounts");
const emails = require("./datastore/emails");

const queryUser = gstore.ds.createQuery('form-user');
const queryEmail = gstore.ds.createQuery('marketing');


migrate = async () => {
  [entities] = await gstore.ds.runQuery(queryUser).catch(console.error);

  let i = 0;
  let start = Date.now();
  for (var entity  of entities) {
    ++i;
    await googleData.migrate(entity);
    if ((i % 1000) === 0) {
      console.log(`${i} - ${(Date.now()-start)/1000}s`);
    }
  }

  console.log("Finished Google Data migration");

  [entities] = await gstore.ds.runQuery(queryEmail).catch(console.error);

  for(var entity of entities) {
    await emails.migrate(entity);
  }
};

migrate();
