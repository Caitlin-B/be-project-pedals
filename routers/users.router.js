const usersRouter = require('express').Router();

const {postUser, getUser, deleteUser} = require('../controllers/users.controller');
const { send405Error } = require("../errors/index");

usersRouter
  .route("/")
  .post(postUser)
  .all(send405Error);;

usersRouter
  .route("/:username")
  .get(getUser)
  .delete(deleteUser)
  .all(send405Error);;

module.exports = usersRouter;


