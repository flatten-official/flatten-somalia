const { getLogger } = require("../../winston");

module.exports = (req, res, next) => {
  getLogger().info(`Endpoint hit: `, { method: req.method, path: req.path });
  next();
};
