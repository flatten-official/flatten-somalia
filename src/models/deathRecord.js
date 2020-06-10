const mongoose = require("mongoose");

const { FormSchema } = require("./types/formSchema");

const model = mongoose.model(
  "DeathRecord",
  new mongoose.Schema({
    submissionSchema: FormSchema,
    gravesite: String,
    age: Number,
    sex: String,
    comorbidities: Object,
    symptomsBeforeDeath: Object,
    causeOfDeath: String,
    dateOfDeath: String,
  })
);

async function insertMany(documents) {
  model.insertMany(documents);
}

module.exports = { model, insertMany };
