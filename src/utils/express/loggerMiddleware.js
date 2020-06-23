const log = require("winston");

module.exports = (req, res, next) => {
  log.info(`Incoming request.`, { method: req.method, path: req.path });
  next();
};
