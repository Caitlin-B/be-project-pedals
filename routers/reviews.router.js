const reviewsRouter = require("express").Router();
const {
  postReviewByRouteId,
  getReviewsByRouteId,
  getReviewById,
  deleteReviewById
} = require("../controllers/reviews.controller");

reviewsRouter
  .route("/:route_id")
  .post(postReviewByRouteId)
  .get(getReviewsByRouteId);

reviewsRouter
  .route("/:route_id/:review_id")
  .get(getReviewById)
  .delete(deleteReviewById);

module.exports = reviewsRouter;
