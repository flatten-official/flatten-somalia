require("dotenv").config(); // Load environment variables from .env

const { getApp } = require("./app");

const port = process.env.PORT || 80;

async function startServer() {
  const app = await getApp();
  app.listen(port, () => {
    console.log(`listening on port ${port}.`);
  });
}

startServer().catch((e) => console.log(e));
