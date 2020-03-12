const usersRouter = require('express').Router();

const {postUser, getUser, deleteUser} = require('../controllers/users.controller');

usersRouter.route('/').post(postUser);

usersRouter.route('/:username').get(getUser).delete(deleteUser);

module.exports = usersRouter;


