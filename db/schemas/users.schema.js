const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  _id: { type: String, required: true },
  password: { type: String, required: true },
  savedRoutes: { type: Array, required: true }
});

module.exports = mongoose.model("users", User);
