const ENV = process.env.NODE_ENV || "dev";
const { Seeder } = require("mongoose-data-seed");
const reviews = require("../schemas/reviews.schema");
const { reviewsData } = require("../data");

class ReviewsSeeder extends Seeder {
  async shouldRun() {
    return reviews
      .countDocuments()
      .exec()
      .then(count => count === 0);
  }

  async run() {
    return reviews.create(reviewsData);
  }
}

module.exports = ReviewsSeeder;
