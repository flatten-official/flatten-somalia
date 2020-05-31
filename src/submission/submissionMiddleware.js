const volunteerAPI = require("../volunteer/volunteerAPI");

module.exports = async (req, res, next) => {
  if (
    res.locals.volunteer &&
    volunteerAPI.canSubmitForms(res.locals.volunteer)
  ) {
    next();
  } else {
    res.sendStatus(403);
  }
};
