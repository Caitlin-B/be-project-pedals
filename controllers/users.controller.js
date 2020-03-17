const {
  addUser,
  fetchUser,
  removeUser,
  addSavedRouteToUser,
  fetchUsers
} = require("../models/users.model");

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
    .then(deleteInfo => {
      if (deleteInfo.deletedCount === 0) {
        return Promise.reject({
          status: 404,
          msg: "Delete Failed - User Not Found"
        });
      }
      res.status(204).send();
    })
    .catch(next);
};

exports.patchUserSavedRoutes = (req, res, next) => {
  const { username } = req.params;
  const { savedRoute } = req.body;

  if (savedRoute === undefined) {
    next({ status: 400, msg: "Invalid Request Body" });
  }

  addSavedRouteToUser(username, savedRoute)
    .then(user => {
      res.status(200).send({ user });
    })
    .catch(next);
};

exports.getUsers = (req, res, next) => {
  fetchUsers()
    .then(users => {
      res.status(200).send({ users });
    })
    .catch(next);
};
