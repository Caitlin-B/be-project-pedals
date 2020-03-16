const usersRouter = require('express').Router();

const {postUser, getUser, deleteUser, patchUserSavedRoutes} = require('../controllers/users.controller');
const { send405Error } = require("../errors/index");

usersRouter
  .route("/")
  .post(postUser)
  .all(send405Error);

usersRouter
  .route("/:username")
  .get(getUser)
  .delete(deleteUser)
  .patch(patchUserSavedRoutes)
  .all(send405Error);

module.exports = usersRouter;


