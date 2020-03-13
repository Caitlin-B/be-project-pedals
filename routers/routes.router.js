const routesRouter = require("express").Router();
const {
  postRoute,
  getAllRoutes,
  getRouteById,
  deleteRouteById
} = require("../controllers/routes.controller");
const { send405Error } = require("../errors/index");

routesRouter
  .route("/")
  .post(postRoute)
  .get(getAllRoutes)
  .all(send405Error);;

routesRouter
  .route("/:route_id")
  .get(getRouteById)
  .delete(deleteRouteById)
  .all(send405Error);;

module.exports = routesRouter;
