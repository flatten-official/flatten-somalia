const { createModel } = require("../../utils/mongoose");

const model = createModel("Household", {
  phone: String,
  email: String,
  // the id that is given to volunteers (NOT the ID in the DB)
  followUpId: {
    type: String,
    index: true,
    sparse: true,
    unique: true,
  },
});

async function create(followUpId, phone, email) {
  const household = new model({ followUpId, phone, email });
  await household.validate();
  return household;
}

module.exports = { model, create };
