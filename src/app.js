const express = require("express");
require("express-async-errors"); // https://www.npmjs.com/package/express-async-errors
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const { makeRequestLoggingMiddleware } = require("./winston");
const { getConfig } = require("./config");
const routes = require("./routes");
const appErrorHandler = require("./utils/express/errorHandler");
const bodySanitizer = require("./utils/express/bodySanitizer");

async function getApp() {
  const app = express();

  app.use(cors({ origin: [getConfig().urls.frontendHost], credentials: true }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(bodyParser.raw());
  app.use(express.json());
  app.use(helmet());
  app.use(helmet.permittedCrossDomainPolicies());
  app.use(cookieParser(getConfig().secrets.cookieSecret));
  app.use(await makeRequestLoggingMiddleware());
  app.use(bodySanitizer);
  app.use("/", routes);
  app.use(appErrorHandler);

  return app;
}

module.exports = { getApp };
