const { addUser, fetchUser, removeUser } = require("../models/users.model");

exports.postUser = (req, res, next) => {
  const { body } = req;

  // if (!body) {
  //   console.log("no body"); //add Promise.reject
  //   return res.status(400);
  // }

  addUser(body).then(user => {
    return res.status(201).send({ user });
  });
};

exports.getUser = (req, res, next) => {
  const { username } = req.params;

  fetchUser(username).then(user => {
    res.status(200).send({ user });
  });
};

//if user doesn't exist, returns object with user: null - maybe throw error here

exports.deleteUser = (req, res, next) => {
  const { username } = req.params;

  removeUser(username).then(user => {
    res.status(204).send();
  });
};
