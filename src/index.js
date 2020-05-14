require("dotenv").config();
const port = process.env.PORT || 80;
const routes = require("./routes");
const express = require("express");

const app = express();



app.use("/", routes);

app.listen(port, () => {
  console.log(`listening on port ${port}.`);
});
