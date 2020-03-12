const { addReviewByRouteId } = require("../models/reviews.model");

exports.postReviewByRouteId = (req, res, next) => {
  const { body } = req;
  const { route_id } = req.params;
  body.route_id = route_id;

  if (!body) {
    console.log("no body"); //add Promise.reject
  }

  addReviewByRouteId(body).then(review => {
    res.status(201).send({ review });
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
