const submissionApi = require("./submissionAPI");
const { Error } = require("mongoose");

module.exports = async (req, res) => {
  try {
    await submissionApi.initialSubmission(
      res.locals.volunteer._id,
      req.body.schema,
      req.body.metadata,
      req.body.people,
      req.body.deaths,
      req.body.household
    );
    res.sendStatus(200);
  } catch (e) {
    if (e instanceof Error.ValidationError) {
      res.status(400);
      res.send("Validation problem with form data.");
    } else throw e;
  }
};
