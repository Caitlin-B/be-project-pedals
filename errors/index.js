exports.typeErrorHandler = (err, req, res, next) => {
  if (err.name === "TypeError") {
    res.status(400).send({ msg: "Invalid Sort Value" });
  } else {
    next(err);
  }
};

exports.validationErrorHandler = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    res.status(406).send({ msg: "Request Data Validation Failed" });
  } else {
    next(err);
  }
};

exports.castErrorHandler = (err, req, res, next) => {
  if (err.name === "CastError") {
    res.status(404).send({ msg: "Requested Data Not Found" });
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

exports.send405Error = (req, res, next) => {
  res.status(405).send({ msg: "Method Not Allowed" });
};

exports.handleServerError = (err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
};