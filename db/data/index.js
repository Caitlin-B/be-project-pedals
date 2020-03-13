const ENV = process.env.NODE_ENV || "development";
const testData = require("./test-data");
const devData = require("./dev-data");

console.log(testData);

console.log(devData);

const data = {
  development: devData,
  test: testData,
  production: devData
};

console.log(data);

module.exports = data[ENV];
