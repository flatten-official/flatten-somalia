const submissionApi = require("./api");
const { Error } = require("mongoose");
const { log } = require("../../utils/winston");

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
      log.error("Failed to submit initial household survey.", {
        error: e,
        status: 400,
      });
    } else if (
      e.message.includes(
        "E11000 duplicate key error collection: test.households index: followUpId_1 dup key:"
      )
    ) {
      log.warning(
        `Conflicting household follow up id keys. Volunteer friendly id: ${res.locals.volunteer.friendlyId}`,
        { error: e, status: 409 }
      );
      res
        .status(409)
        .send(
          "Failed. You are submitting forms too quickly or someone else is using your account. Please restart survey."
        );
    } else throw e;
  }
};
