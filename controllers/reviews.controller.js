const {
  addReviewByRouteId,
  fetchReviewsByRouteId,
  fetchReviewById,
  removeReviewById
} = require("../models/reviews.model");

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

exports.getReviewsByRouteId = (req, res, next) => {
  const { route_id } = req.params;

  fetchReviewsByRouteId(route_id).then(reviews => {
    res.status(200).send({ reviews });
  });
};

exports.getReviewById = (req, res, next) => {
  const { review_id } = req.params;

  fetchReviewById(review_id).then(review => {
    res.status(200).send({ review });
  });
};

exports.deleteReviewById = (req, res, next) => {
  const { route_id, review_id } = req.params;
  removeReviewById(review_id).then(review => {
    res.status(204).send();
  });
};
