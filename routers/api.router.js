const apiRouter = require("express").Router();
const usersRouter = require("./users.router");
const routesRouter = require("./routes.router");
const reviewsRouter = require("./reviews.router");
const { send405Error } = require("../errors/index");

apiRouter.all(send405Error);
apiRouter.use("/users", usersRouter);
apiRouter.use("/routes", routesRouter);
apiRouter.use("/reviews", reviewsRouter);

module.exports = apiRouter;
