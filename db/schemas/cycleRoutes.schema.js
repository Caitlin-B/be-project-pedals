const mongoose = require("mongoose");
const GeoJSON = require("mongoose-geojson-schema");

const CycleRoute = new mongoose.Schema({
  // type: {type: String, required: true},
  features: { type: Array, required: true },
  user_id: { type: String, required: true }
});

module.exports = mongoose.model("cycleRoutes", CycleRoute);
