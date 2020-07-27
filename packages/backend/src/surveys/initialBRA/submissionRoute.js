const { submitInitialBRASurvey } = require("./api");
const { log } = require("util-logging");

module.exports = async (req, res) => {
  await submitInitialBRASurvey(
    res.locals.volunteer._id,
    res.locals.volunteer.teamName,
    req.body.schema,
    req.body.metadata,
    req.body.data
  );
  res.sendStatus(200);
  log.info("Successfully submitted initial BRA survey.", { status: 200 });
};
