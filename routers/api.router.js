const apiRouter = require("express").Router();
const usersRouter = require("./users.router");
const routesRouter = require("./routes.router");

apiRouter.use("/users", usersRouter);
apiRouter.use("/routes", routesRouter);

module.exports = apiRouter;
