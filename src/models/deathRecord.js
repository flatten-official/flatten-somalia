const mongoose = require("mongoose");

const GravediggerDeathRecord = mongoose.model(
  "GravediggerDeathRecord",
  new mongoose.Schema({
    sex: String,
    age: Number,
    dateOfDeath: String,
    gravesite: String,
    causeOfDeath: String,
    comorbidities: Object,
    symptomsBeforeDeath: Object,
  })
);

module.exports = { GravediggerDeathRecord };
