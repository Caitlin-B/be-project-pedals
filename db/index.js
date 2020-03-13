const ENV = process.env.NODE_ENV || "project-pedals";

const mongoURI = process.env.MONGODB_URI || `mongodb://127.0.0.1:27017/${ENV}`;

const mongoose = require("mongoose");

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .catch(e => {
    console.error("connection error", e.message);
  });

const db = mongoose.connection;

module.exports = db;
