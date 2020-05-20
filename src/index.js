require("dotenv").config();
const port = process.env.PORT || 80;
const routes = require("./routes");
const express = require("express");

const app = express();
var appPromise = require("./app").appPromise;

app.use("/", routes);

appPromise.then(function (app) {
  app.listen(port, () => {
    console.log(`listening on port ${port}.`);
  });
});
