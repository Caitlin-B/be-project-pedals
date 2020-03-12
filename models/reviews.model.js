const Review = require("../db/schemas/reviews.schema");

exports.addReviewByRouteId = body => {
  const review = new Review(body);

  return review.save();
};
