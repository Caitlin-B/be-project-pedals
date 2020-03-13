const ENV = process.env.NODE_ENV || "project-pedals";

const mongoURL = process.env.MONGODB_URL || `mongodb://127.0.0.1:27017/${ENV}`;

const mongoose = require("mongoose");

mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .catch(e => {
    console.error("connection error", e.message);
  });

const db = mongoose.connection;

module.exports = db;
