const log = require("winston");

module.exports = (req, res, next) => {
  log.info(`${req.method.padEnd(8, " ")}${req.path}`);
  next();
};
