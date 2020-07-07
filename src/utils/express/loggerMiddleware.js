const { log } = require("../../utils/winston");

module.exports = (req, res, next) => {
  log.info(`Endpoint hit: ${req.method} ${req.path}`);
  next();
};
