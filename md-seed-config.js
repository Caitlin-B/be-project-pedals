const mongoose = require("mongoose");
const routes = require("./db/seeds/routes.seeder");

const mongoURL =
  process.env.MONGO_URL || "mongodb://127.0.0.1:27017/project-pedals";

/**
 * Seeders List
 * order is important
 * @type {Object}
 */
exports.seedersList = { routes };
/**
 * Connect to mongodb implementation
 * @return {Promise}
 */
exports.connect = async () =>
  await mongoose.connect(mongoURL, { useNewUrlParser: true });
/**
 * Drop/Clear the database implementation
 * @return {Promise}
 */
exports.dropdb = async () => mongoose.connection.db.dropDatabase();
