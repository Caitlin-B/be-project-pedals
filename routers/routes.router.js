const routesRouter = require("express").Router();
const { postRoute, getAllRoutes, getRouteById } = require("../controllers/routes.controller");

routesRouter
  .route("/")
  .post(postRoute)
  .get(getAllRoutes);

routesRouter.route("/:route_id").get(getRouteById);

module.exports = routesRouter;
