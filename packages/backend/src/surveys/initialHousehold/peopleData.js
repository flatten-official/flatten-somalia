const { createModel } = require("../../utils/mongoose");
const mongoose = require("db-utils");

const model = createModel("Person", {
  name: String,
  gender: String,
  alive: {
    type: Boolean,
    required: true,
    index: true,
    default: true,
  },
  household: {
    type: mongoose.ObjectId,
    ref: "Household",
    required: true,
    index: true,
  },
});

function createManyAsync(perPersonData) {
  return Promise.all(
    perPersonData.map(async (personData) => {
      const person = new model(personData);
      await person.validate();
      return person;
    })
  );
}

module.exports = { model, createManyAsync };
