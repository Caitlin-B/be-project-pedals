const apiRouter = require("express").Router();
const usersRouter = require("./users.router");
const routesRouter = require("./routes.router");
const reviewsRouter = require("./reviews.router");

apiRouter.use("/users", usersRouter);
apiRouter.use("/routes", routesRouter);
apiRouter.use("/reviews", reviewsRouter);

module.exports = apiRouter;
