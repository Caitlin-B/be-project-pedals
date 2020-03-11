const Route = require("../db/schemas/routes.schema");

exports.addRoute = body => {
  const route = new Route(body);

  return route.save();
};

exports.fetchAllRoutes = () => {
  return Route.find();
};

exports.fetchRouteById = _id => {
  return Route.findOne({ _id });
};

exports.removeRouteById = _id => {
  return Route.deleteOne({ _id });
};
