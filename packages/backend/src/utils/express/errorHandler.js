const { log } = require("util-logging");
const { getConfig } = require("util-config");

// Doesn't work without next (4 params are used to indicate an error catcher)
// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  log.error("An uncaught error occurred while handling the request.", {
    error: err,
  });
  if (getConfig().sendClientErrors)
    res.status(500).json({ message: err.message, error: err });
  else
    res
      .status(500)
      .send(
        "Flatten's server had an unplanned error. Contact Flatten for support."
      );
};
