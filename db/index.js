const ENV = process.env.NODE_ENV || "development";

const DB_URL = {
  production: process.env.MONGODB_URI,
  development: "mongodb://127.0.0.1:27017/project-pedals",
  test: `mongodb://127.0.0.1:27017/test`
};

const mongoURI = DB_URL[ENV];

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
