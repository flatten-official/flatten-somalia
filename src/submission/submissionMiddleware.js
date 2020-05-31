const volunteerAPI = require("../volunteer/volunteerAPI");

module.exports = async (req, res, next) => {
  if (volunteerAPI.canSubmitForms(res.locals.volunteer)) {
    next();
  } else {
    res.sendStatus(403);
  }
};
