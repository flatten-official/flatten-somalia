const mongoose = require("mongoose");

const createModel = (name, definition) =>
  mongoose.model(name, new mongoose.Schema(definition, { strict: "throw" })); // strict throw doesn't allow extra fields to be silently dropped

module.exports = { createModel };
