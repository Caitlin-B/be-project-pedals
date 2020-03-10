const CycleRoute = require("../db/schemas/cycleRoutes.schema");

exports.addRoute = body => {
  const cycleRoute = new CycleRoute(body);

  return cycleRoute.save();
};

exports.fetchAllRoutes = () => {
  return CycleRoute.find();
};

exports.fetchRouteById = (route_id) => {
  return CycleRoute.findOne({ _id: route_id });
}