const {addUser} = require('../models/users.model')

exports.postUser = (req, res, next) => {
  const {body} = req;
  console.log('posting user controller')

  addUser()
  if(!body) {
    return res.status(400).se
  }
}