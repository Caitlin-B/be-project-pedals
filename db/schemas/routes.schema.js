const mongoose = require("mongoose");
const GeoJSON = require("mongoose-geojson-schema");

const Route = new mongoose.Schema({
  routeName: { type: String, require: true },
  type: { type: String },
  features: { type: Array, required: true },
  user_id: { type: String, required: true },
  posted: { type: Date, default: Date.now },
  calculatedDistance: { type: Number, required: true },
  center: { type: Array, required: true },
  zoom: { type: Array, required: true },
  // elevation: {type:}
  city: { type: String, required: true },
  averageRating: { type: Number, default: 0 }
});

module.exports = mongoose.model("routes", Route);
