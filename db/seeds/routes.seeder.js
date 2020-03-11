const { Seeder } = require("mongoose-data-seed");
const routes = require("../schemas/routes.schema");
const { data } = require("../data/routes");

class RoutesSeeder extends Seeder {
  async shouldRun() {
    return routes
      .countDocuments()
      .exec()
      .then(count => count === 0);
  }

  async run() {
    return routes.create(data);
  }
}

module.exports = RoutesSeeder;
