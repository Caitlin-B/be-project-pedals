const User = require("../db/schemas/users.schema");

exports.addUser = body => {
  const user = new User(body);

  return user.save();
};

exports.fetchUser = username => {
  return User.findOne({ _id: username });
};

exports.removeUser = username => {
  return User.deleteOne({ _id: username });
};