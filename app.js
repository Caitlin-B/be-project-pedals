const express = require("express");
const app = express();
const cors = require("cors");
const db = require("/Users/caitlinbishop/Desktop/Coding/project/project-pedals/be-project-pedals/db/index");
const apiRouter = require("./routers/api.router");
const { handleCustomError, typeErrorHandler } = require("./errors/index");

app.use(cors())
app.use(express.json());

app.use("/api", apiRouter);

// db.on("connection", () => {
//   console.log("connected to db");
// });

app.use(typeErrorHandler);
app.use(handleCustomError);

db.on("error", console.error.bind(console, "MongoDB connection error: "));

module.exports = app;
