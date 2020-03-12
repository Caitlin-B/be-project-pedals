const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./db");
const apiRouter = require("./routers/api.router");

app.use(express.json());

app.use("/api", apiRouter);

// db.on("connection", () => {
//   console.log("connected to db");
// });

db.on("error", console.error.bind(console, "MongoDB connection error: "));

module.exports = app;
