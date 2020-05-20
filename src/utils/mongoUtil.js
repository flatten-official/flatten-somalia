const { Secret } = require("./networkValues");
const mongoose = require("mongoose");

async function connectToDB() {
  const connectionURL = await new Secret(
    process.env.DB_CONNECTION_SECRET_ID
  ).get();

  try {
    await mongoose.connect(connectionURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (e) {
    console.log("Failed to connect to database.");
    throw e;
  }

  console.log("Connected to database");
}

module.exports = { connectToDB };
