const { isValidationTypeError } = require("../dataUtil");
const { initialSubmission } = require("./api");

module.exports = async (req, res) => {
  try {
    if (req.body.people === undefined) req.body.people = [];
    if (req.body.deaths === undefined) req.body.deaths = [];
    await initialSubmission(
      res.locals.volunteer._id,
      res.locals.volunteer.teamName,
      req.body.schema,
      req.body.metadata,
      req.body.people,
      req.body.deaths,
      req.body.household
    );
    res.sendStatus(200);
  } catch (e) {
    if (isValidationTypeError(e)) {
      console.error(e);
      res.status(400).send("Validation problem with form models.");
    } else throw e;
  }
};
