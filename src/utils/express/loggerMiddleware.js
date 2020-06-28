const { log } = require("../../utils/winston");

module.exports = (req, res, next) => {
  log.info(`Endpoint hit: `, { method: req.method, path: req.path });
  next();
};
