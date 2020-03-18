const User = require("../db/schemas/users.schema");

exports.addUser = body => {
  const user = new User(body);

  return user.save();
};

exports.fetchUser = username => {
  return User.findOne({ _id: username }).select("-password");
};

exports.removeUser = username => {
  return User.deleteOne({ _id: username });
};

exports.addSavedRouteToUser = (username, savedRoute) => {
  return User.findOneAndUpdate(
    { _id: username },
    { $push: { savedRoutes: savedRoute } },
    { new: true }
  ).select("-password");
};

exports.fetchUsers = () => {
  return User.find().select("-password");
};
