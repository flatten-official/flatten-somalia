const submissionApi = require("./submissionApi");
const mongoose = require("mongoose");
const { ValidationError } = require("../../test/testUtils/mongo");

module.exports = async (req, res) => {
  try {
    await submissionApi.initialSubmission(
      res.locals.volunteer._id,
      req.schema,
      req.metadata,
      req.people,
      req.deaths,
      req.household
    );
    res.sendStatus(200);
  } catch (e) {
    if (e instanceof ValidationError) {
      res.status(400);
      res.send("Validation problem with form data.");
    } else {
      res.status(500);
      res.send("Server error.");
    }
    console.error(e);
  }
};
