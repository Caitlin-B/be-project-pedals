const {
  addRoute,
  fetchAllRoutes,
  fetchRouteById,
  removeRouteById
} = require("../models/routes.model");

exports.postRoute = (req, res, next) => {
  const { body } = req;

  if (!body) {
    console.log("no body"); //add Promise.reject
  }

  addRoute(body).then(route => {
    res.status(201).send({ route });
  });
};

exports.getAllRoutes = (req, res, next) => {
  const { type, user, sort_by, order } = req.query;

  fetchAllRoutes(type, user, sort_by, order)
    .then(routes => {
      if (routes.length === 0) {
        return Promise.reject({ status: 404, msg: "Query Not Found" });
      }
      if (
        sort_by !== undefined &&
        sort_by !== "posted" &&
        sort_by !== "calculatedDistance" &&
        sort_by !== "averageRating"
      ) {
        return Promise.reject({ status: 400, msg: "Invalid Query Entry" });
      }

      res.status(200).send({ routes });
    })
    .catch(next);
};

exports.getRouteById = (req, res, next) => {
  const { route_id } = req.params;

  fetchRouteById(route_id).then(route => {
    res.status(200).send({ route });
  });
};

exports.deleteRouteById = (req, res, next) => {
  const { route_id } = req.params;
  removeRouteById(route_id).then(route => {
    res.status(204).send();
  });
};
