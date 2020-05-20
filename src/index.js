require("dotenv").config(); // Load environment variables from .env

const { connectToDB } = require("./utils/mongoUtil");
const { getApp } = require("./app");

const port = process.env.PORT || 80;

// TODO Prefetch secrets to save time

async function setup() {
  await connectToDB();
}

async function startServer() {
  const app = await getApp();
  app.listen(port, () => {
    console.log(`listening on port ${port}.`);
  });
}

setup()
  .then(startServer)
  .catch((e) => console.log(e));
