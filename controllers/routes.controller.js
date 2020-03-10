const { addRoute, fetchAllRoutes, fetchRouteById } = require("../models/routes.model");

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
  fetchAllRoutes().then(routes => {
    res.status(200).send({ routes });
  });
}

exports.getRouteById = (req, res, next) => {
  const {route_id} = req.params;

  fetchRouteById(route_id).then(route => {
    res.status(200).send({route});
  })
}