require("dotenv").config(); // Load environment variables from .env

const { cleanupDatabase, setupDatabase } = require("./utils/mongo");
const { getApp } = require("./app");

const port = process.env.PORT || 80;

// TODO Prefetch secrets to save time

async function setup() {
  await setupDatabase();
}

async function startServer() {
  const app = await getApp();
  app.listen(port, () => {
    console.log(`listening on port ${port}.`);
  });
}

async function cleanup() {
  await cleanupDatabase();
}

setup()
  .then(startServer)
  .catch((e) => console.log(e))
  .finally(cleanup);
