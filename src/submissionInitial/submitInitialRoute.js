const submissionApi = require("./submissionAPI");
const { Error } = require("mongoose");
const { log } = require("../utils/winston");

module.exports = async (req, res) => {
  try {
    if (req.body.people === undefined) req.body.people = [];
    if (req.body.deaths === undefined) req.body.deaths = [];
    await submissionApi.initialSubmission(
      res.locals.volunteer._id,
      res.locals.volunteer.teamName,
      req.body.schema,
      req.body.metadata,
      req.body.people,
      req.body.deaths,
      req.body.household
    );
    res.sendStatus(200);
    log.info("Successfully submitted initial household survey.", {
      status: 200,
    });
  } catch (e) {
    if (e instanceof Error.ValidationError) {
      res.status(400).send("Validation problem with form models. ");
      log.warning("Failed to submit initial household survey.", {
        error: e,
        status: 400,
      });
    } else throw e;
  }
};
