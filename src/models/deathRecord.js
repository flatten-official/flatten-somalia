const mongoose = require("mongoose");

const { FormSchema } = require("./types/formSchema");

const DeathRecord = mongoose.model(
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

module.exports = { DeathRecord };
