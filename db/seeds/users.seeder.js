const ENV = process.env.NODE_ENV || "dev";
const { Seeder } = require("mongoose-data-seed");
const users = require("../schemas/users.schema");
const { usersData } = require("../data");
const { formatUsers } = require("../utils");

const data = formatUsers(usersData);

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
