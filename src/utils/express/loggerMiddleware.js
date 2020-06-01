module.exports = (req, res, next) => {
  console.log(`REQUEST: ${req.method} ${req.path}`);
  next();
};
