const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./db/index");
const apiRouter = require("./routers/api.router");
const {
  handleCustomError,
  typeErrorHandler,
  validationErrorHandler,
  castErrorHandler, 
  handleServerError
} = require("./errors/index");

app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);

// db.on("connection", () => {
//   console.log("connected to db");
// });

app.use(typeErrorHandler);
app.use(validationErrorHandler);
app.use(castErrorHandler);
app.use(handleCustomError);
app.use(handleServerError);


db.on("error", console.error.bind(console, "MongoDB connection error: "));

module.exports = app;
