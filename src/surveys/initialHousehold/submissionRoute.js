const { initialSubmission } = require("./api");
const { log } = require("../../utils/winston");

module.exports = async (req, res) => {
  await initialSubmission(
    res.locals.volunteer._id,
    res.locals.volunteer.teamName,
    req.body.schema,
    req.body.metadata,
    req.body.people || [],
    req.body.deaths || [],
    req.body.household
  );
  res.sendStatus(200);
  log.info("Successfully submitted initial household survey.", {
    status: 200,
  });
};
