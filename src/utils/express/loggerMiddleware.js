const { log } = require("../../utils/winston");

module.exports = (req, res, next) => {
  log.debug(`Endpoint hit: /`, { method: req.method, path: req.path });
  next();
};
