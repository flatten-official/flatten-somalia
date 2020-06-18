const { createModel } = require("../dataUtil");
const mongoose = require("mongoose");

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

async function createMany(perPersonData) {
  return Promise.all(
    perPersonData.map(async (personData) => {
      const person = new model(personData);
      await person.validate();
      return person;
    })
  );
}

// async function setToDead(personId) {
//   await model.findByIdAndUpdate(personId, {
//     $push: {
//       alive: false,
//     },
//   });
// }

module.exports = { model, createMany };
