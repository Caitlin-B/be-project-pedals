const User = require("../db/schemas/users.schema");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");

exports.postLogin = (req, res, next) => {
  const { username, password } = req.body;
  return User.findOne({ _id: username })
    .then((user) => {
      if (!user) {
        next({ status: 401, msg: "invalid username" });
      } else {
        return Promise.all([bcrypt.compare(password, user.password), user]);
      }
    })
    .then(([passwordOk, user]) => {
      if (passwordOk) {
        const token = jwt.sign(
          { user: user.username, iat: Date.now() },
          JWT_SECRET
        );
        res.send({ token });
        //returning true for correct password but not sending token
      } else {
        next({ status: 401, msg: "invalid password" });
      }
    })
    .catch(next);
};

exports.validateToken = (req, res, next) => {
  // Header in the format 'BEARER <token>' split to extract the token
  const { authorization } = req.headers;
  if (!authorization) {
    next({ status: 401, msg: "unauthorised" });
  } else {
    const token = authorization.split(" ")[1];
    jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) next({ status: 401, msg: "unauthorised" });
      else next();
    });
  }
};
