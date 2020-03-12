const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Review = new Schema({
  user_id: { type: String, required: true },
  body: { type: String, required: true },
  rating: { type: Number, min: 0, max: 5, required: true },
  posted: { type: Date, default: Date.now },
  route_id: { type: String, required: true }
});

module.exports = mongoose.model("reviews", Review);
