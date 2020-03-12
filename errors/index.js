exports.typeErrorHandler = (err, req, res, next) => {
  console.log("typeErrorHandler");
  if (err.name === "TypeError") {
    res.status(400).send({ msg: "Invalid Sort Value" });
  } else {
    next(err);
  }
};

exports.handleCustomError = (err, req, res, next) => {
  console.log("handleCustomError");
  if (err.status !== undefined) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};
