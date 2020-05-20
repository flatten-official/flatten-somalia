require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const app = express();

const routes = require("./routes");
const { Secret } = require("./utils/networkValues");
const cookieSecret = new Secret(process.env.COOKIE_SECRET_ID);

async function getApp() {
  const cookieSecretString = await cookieSecret.get();

  if (process.env.ENVIRONMENT === "dev") {
    app.use(cors({ origin: true, credentials: true }));
  } else {
    app.use(
      cors({
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      })
    );
  }
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(bodyParser.raw());
  app.use(express.json());
  app.use(helmet());
  app.use(helmet.permittedCrossDomainPolicies());
  app.use(cookieParser(cookieSecretString));
  app.use("/", routes);

  return app;
}

module.exports = { getApp };
