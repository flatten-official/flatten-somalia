const { getLogger } = require("../../winston");

module.exports = (req, res, next) => {
  const log = getLogger();
  log.info(`Incoming request.`, { method: req.method, path: req.path });
  next();
};
