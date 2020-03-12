const mongoose = require("mongoose");
const routes = require("./db/seeds/routes.seeder");
const users = require("./db/seeds/users.seeder");
const reviews = require("./db/seeds/reviews.seeder");

const ENV = process.env.NODE_ENV || "project-pedals";

const mongoURL = process.env.MONGO_URL || `mongodb://127.0.0.1:27017/${ENV}`;

/**
 * Seeders List
 * order is important
 * @type {Object}
 */
exports.seedersList = { routes, users, reviews };
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
