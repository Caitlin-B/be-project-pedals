const { Seeder } = require("mongoose-data-seed");
const users = require("../schemas/users.schema");
const { data } = require("../data/users");

class UsersSeeder extends Seeder {
  async shouldRun() {
    return users
      .countDocuments()
      .exec()
      .then(count => count === 0);
  }

  async run() {
    return users.create(data);
  }
}

module.exports = UsersSeeder;
