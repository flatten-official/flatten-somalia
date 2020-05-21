const mongoose = require("mongoose");

// DO NOT MODIFY SCHEMA/MODEL UNLESS YOU KNOW WHAT YOU'RE DOING
const volunteerSchema = new mongoose.Schema({
  name: String,
  addedBy: mongoose.ObjectId,
  permissions: [String],
  email: { type: String, index: true, unique: true },
  gender: String,
  age: Number,
});

const Volunteer = mongoose.model("Volunteer", volunteerSchema);

module.exports = { Volunteer };
