const {
  addReviewByRouteId,
  fetchReviewsByRouteId,
  fetchReviewById,
  removeReviewById
} = require("../models/reviews.model");
const { fetchRouteById } = require("../models/routes.model");

exports.postReviewByRouteId = (req, res, next) => {
  const { body } = req;

  if (Object.keys(body).length !== 0) {
    const { route_id } = req.params;
    body.route_id = route_id;
  }

  addReviewByRouteId(body)
    .then(review => {
      res.status(201).send({ review });
    })
    .catch(next);
};

exports.getReviewsByRouteId = (req, res, next) => {
  const { route_id } = req.params;
  const promises = [
    fetchReviewsByRouteId(route_id),
    checkRouteExists(route_id)
  ];

  return Promise.all(promises)
    .then(([reviews, routeExists]) => {
      if (!reviews.length && !routeExists) {
        return Promise.reject({ status: 404, msg: "Reviews Not Found" });
      } else {
        res.status(200).send({ reviews });
      }
    })
    .catch(next);
};

exports.getReviewById = (req, res, next) => {
  const { review_id } = req.params;

  fetchReviewById(review_id)
    .then(review => {
      res.status(200).send({ review });
    })
    .catch(next);
};

exports.deleteReviewById = (req, res, next) => {
  const { route_id, review_id } = req.params;

  removeReviewById(review_id)
    .then(review => {
      if (review.deletedCount === 0) {
        return Promise.reject({
          status: 404,
          msg: "Delete Failed - Review Not Found"
        });
      }
      res.status(204).send();
    })
    .catch(next);
};

const checkRouteExists = route_id => {
  return fetchRouteById(route_id)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};
