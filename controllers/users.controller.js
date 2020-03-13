const { addUser, fetchUser, removeUser } = require("../models/users.model");

exports.postUser = (req, res, next) => {
  const { body } = req;

  addUser(body)
    .then(user => {
      return res.status(201).send({ user });
    })
    .catch(next);
};

exports.getUser = (req, res, next) => {
  const { username } = req.params;

  fetchUser(username)
    .then(user => {
      if (user === null) {
        return Promise.reject({
          status: 404,
          msg: "Requested User Not Found"
        });
      }

      res.status(200).send({ user });
    })
    .catch(next);
};

exports.deleteUser = (req, res, next) => {
  const { username } = req.params;

  removeUser(username)
    .then((deleteInfo) => {
      if (deleteInfo.deletedCount === 0) {
        return Promise.reject({ status: 404, msg: "Delete Failed - User Not Found" });
      }
      res.status(204).send();
    })
    .catch(next);
};
