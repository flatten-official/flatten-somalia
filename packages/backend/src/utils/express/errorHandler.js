const { log } = require("util-logging");
const { getConfig } = require("util-config");

// Doesn't work without next (4 params are used to indicate an error catcher)
// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  const status = err.statusCode || 500;

  log.error("An error occurred while handling the request.", {
    error: err,
    status,
  });

  if (getConfig().sendClientErrors)
    res.status(status).json({ message: err.message, error: err });
  else
    res
      .status(status)
      .send(
        "Flatten's server had an unplanned error. Contact Flatten for support."
      );
};
