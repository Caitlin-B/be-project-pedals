const Route = require("../db/schemas/routes.schema");

exports.addRoute = body => {
  const route = new Route(body);

  return route.save();
};

exports.fetchAllRoutes = () => {
  return Route.find();
};

exports.fetchRouteById = route_id => {
  return Route.findOne({ _id: route_id });
};
