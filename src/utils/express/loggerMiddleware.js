module.exports = (req, res, next) => {
  req.log.info(`Endpoint hit: `, { method: req.method, path: req.path });
  next();
};
