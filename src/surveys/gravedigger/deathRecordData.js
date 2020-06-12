const Util = require("../dataUtil");

const { FormSchema } = require("../sharedDataSchemas");

const model = Util.createModel("GravediggerDeathRecord", {
  submissionSchema: FormSchema,
  gravesite: String,
  age: Number,
  sex: String,
  wasPregnant: String,
  comorbidities: Object,
  otherComorbidities: String,
  symptomsBeforeDeath: Object,
  otherSymptomsBeforeDeath: String,
  causeOfDeath: String,
  dateOfDeath: String,
});

const create = async (content) => {
  const submissionDocument = new model(content);
  await submissionDocument.validate();
  return submissionDocument;
};

const insertMany = async (documents) => await model.insertMany(documents);

module.exports = { model, insertMany, create };
