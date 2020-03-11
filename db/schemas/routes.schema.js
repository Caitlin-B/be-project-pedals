const mongoose = require("mongoose");
const GeoJSON = require("mongoose-geojson-schema");

const Route = new mongoose.Schema({
  title: { type: String, require: true },
  type: { type: String },
  features: { type: Array, required: true },
  user_id: { type: String, required: true },
  posted: { type: Date, default: Date.now }
});

module.exports = mongoose.model("routes", Route);
