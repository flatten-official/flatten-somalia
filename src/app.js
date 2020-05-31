require("dotenv").config();
const express = require("express");
require("express-async-errors"); // https://www.npmjs.com/package/express-async-errors
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const { Config } = require("./config");
const routes = require("./routes");
const appErrorHandler = require("./utils/express/errorHandler");

function getApp() {
  const app = express();

  if (process.env.ENVIRONMENT === "production") {
    app.use(
      cors({
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      })
    );
  } else {
    app.use(cors({ origin: true, credentials: true }));
  }
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(bodyParser.raw());
  app.use(express.json());
  app.use(helmet());
  app.use(helmet.permittedCrossDomainPolicies());
  app.use(cookieParser(Config.secrets.cookieSecret));
  app.use("/", routes);
  app.use(appErrorHandler);

  return app;
}

module.exports = { getApp };
