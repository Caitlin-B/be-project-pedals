exports.typeErrorHandler = (err, req, res, next) => {
 
  if (err.name === "TypeError") {
    res.status(400).send({ msg: "Invalid Sort Value" });
  } else {
    next(err);
  }
};

exports.validationErrorHandler = (err, req, res, next) => {
  
  if (err.name === "ValidationError") {
    res.status(406).send({ msg: "Request Form Not Acceptable" });
  } else {
    next(err);
  }
};

exports.handleCustomError = (err, req, res, next) => {
  
  if (err.status !== undefined) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};
