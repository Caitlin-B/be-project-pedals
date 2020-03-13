const reviewsRouter = require("express").Router();
const {
  postReviewByRouteId,
  getReviewsByRouteId,
  getReviewById,
  deleteReviewById
} = require("../controllers/reviews.controller");
const { send405Error } = require("../errors/index");
const { validateToken } = require("../controllers/authorisation.controller");

reviewsRouter
  .route("/:route_id")
  .post(validateToken, postReviewByRouteId)
  .get(getReviewsByRouteId)
  .all(send405Error);

reviewsRouter
  .route("/:route_id/:review_id")
  .get(getReviewById)
  .delete(deleteReviewById)
  .all(send405Error);

module.exports = reviewsRouter;
