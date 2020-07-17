const { log } = require("util-logging");

module.exports = (req, res, next) => {
  log.info(`Endpoint hit: ${req.method} ${req.path}`);
  next();
};
