const ENV = process.env.NODE_ENV || "dev";
const { Seeder } = require("mongoose-data-seed");
const routes = require("../schemas/routes.schema");
const { routesData } = require("../data");

// const data = routesData[`${ENV}Data`];

class RoutesSeeder extends Seeder {
  async shouldRun() {
    return routes
      .countDocuments()
      .exec()
      .then(count => count === 0);
  }

  async run() {
    return routes.create(routesData);
  }
}

module.exports = RoutesSeeder;
