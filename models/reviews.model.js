const Review = require("../db/schemas/reviews.schema");

exports.addReviewByRouteId = body => {
  const review = new Review(body);

  return review.save();
};

exports.fetchReviewsByRouteId = route_id => {
  return Review.find({ route_id });
};

exports.fetchReviewById = _id => {
  return Review.findOne({ _id });
};

exports.removeReviewById = _id => {
  return Review.deleteOne({ _id });
};
