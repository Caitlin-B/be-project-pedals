const routesRouter = require("express").Router();
const {
  postRoute,
  getAllRoutes,
  getRouteById,
  deleteRouteById
} = require("../controllers/routes.controller");

routesRouter
  .route("/")
  .post(postRoute)
  .get(getAllRoutes);

routesRouter
  .route("/:route_id")
  .get(getRouteById)
  .delete(deleteRouteById);

module.exports = routesRouter;
