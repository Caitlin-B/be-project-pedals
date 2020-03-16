const apiRouter = require("express").Router();
const usersRouter = require("./users.router");
const routesRouter = require("./routes.router");
const reviewsRouter = require("./reviews.router");
const { send405Error } = require("../errors/index");
const {postLogin} = require("../controllers/authorisation.controller")

apiRouter.post("/login", postLogin).all(send405Error);
//here does it need to be apiRouter.route("/login").post, then.all
apiRouter.use("/users", usersRouter);
apiRouter.use("/routes", routesRouter);
apiRouter.use("/reviews", reviewsRouter);

module.exports = apiRouter;
