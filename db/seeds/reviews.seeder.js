const { Seeder } = require("mongoose-data-seed");
const reviews = require("../schemas/reviews.schema");
const { data } = require("../data/reviews");

class ReviewsSeeder extends Seeder {
  async shouldRun() {
    return reviews
      .countDocuments()
      .exec()
      .then(count => count === 0);
  }

  async run() {
    return reviews.create(data);
  }
}

module.exports = ReviewsSeeder;
