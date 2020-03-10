const usersRouter = require('express').Router();

const {postUser} = require('../controllers/users.controller');

usersRouter.route('/').post(postUser);

module.exports = usersRouter;


