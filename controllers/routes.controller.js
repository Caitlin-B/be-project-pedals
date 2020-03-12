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
  fetchAllRoutes(type, user, sort_by, order).then(routes => {
    res.status(200).send({ routes });
  });
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
