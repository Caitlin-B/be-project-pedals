const { addUser, fetchUser } = require("../models/users.model");

exports.postUser = (req, res, next) => {
  const { body } = req;

  if (!body) {
    console.log("no body");
    return res.status(400);
  }

  addUser(body).then(user => {
    res.status(201).send({ user });
  });
};

exports.getUser = (req, res, next) => {
  const { username } = req.params;

  fetchUser(username).then(user => {
    res.status(200).send({ user });
  });
};
