const { Seeder } = require("mongoose-data-seed");
const cycleRoutes = require("../schemas/cycleRoutes.schema");

const data = [{ features: [2, 3], user_id: "jessjelly" }];

class RoutesSeeder extends Seeder {
  async shouldRun() {
    return cycleRoutes
      .countDocuments()
      .exec()
      .then(count => count === 0);
  }

  async run() {
    return cycleRoutes.create(data);
  }
}

module.exports = RoutesSeeder;
