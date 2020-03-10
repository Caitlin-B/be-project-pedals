const usersRouter = require('express').Router();

const {postUser, getUser} = require('../controllers/users.controller');

usersRouter.route('/').post(postUser);

usersRouter.route('/:username').get(getUser);

module.exports = usersRouter;


