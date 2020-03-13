const apiRouter = require("express").Router();
const usersRouter = require("./users.router");
const routesRouter = require("./routes.router");
const reviewsRouter = require("./reviews.router");
const { send405Error } = require("../errors/index");
const {postLogin} = require("../controllers/authorisation.controller")

apiRouter.post('/login', postLogin)

apiRouter.all(send405Error);
apiRouter.use("/users", usersRouter);
apiRouter.use("/routes", routesRouter);
apiRouter.use("/reviews", reviewsRouter);

module.exports = apiRouter;
