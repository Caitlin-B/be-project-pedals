const Route = require("../db/schemas/routes.schema");

exports.addRoute = body => {
  const route = new Route(body);

  return route.save();
};

exports.fetchAllRoutes = (type, user_id, sort_by, order = "desc") => {
  const query = {};
  const sort = {};
  console.log(order);
  if (type) query.type = type;
  if (user_id) query.user_id = user_id;
  if (sort_by) sort[sort_by] = order;
  return Route.find(query).sort(sort);
};

exports.fetchRouteById = _id => {
  return Route.findOne({ _id });
};

exports.removeRouteById = _id => {
  return Route.deleteOne({ _id });
};
