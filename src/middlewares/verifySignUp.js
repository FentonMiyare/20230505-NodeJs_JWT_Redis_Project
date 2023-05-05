const createError = require('http-errors')
const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  try {
    // Username
    User.findOne({
      username: req.body.username
    }).exec((err, user) => {
      if (err)
        return next(createError.InternalServerError(err))

      if (user)
        return next(createError.Conflict("Failed! Username is already in use!"))

      // Email
      User.findOne({
        email: req.body.email
      }).exec((err, user) => {
        if (err)
          return next(createError.InternalServerError(err))

        if (user)
          return next(createError.Conflict("Failed! Email is already in use!"))
          
        next();
      });
    });
  } catch (error) {
    next(error)
  }
};

checkRolesExisted = (req, res, next) => {
  try {
    if (req.body.roles) {
      for (let i = 0; i < req.body.roles.length; i++) {
        if (!ROLES.includes(req.body.roles[i]))
          next(createError.BadRequest(`Failed! Role ${req.body.roles[i]} does not exist!`));
      }
    }

    next();
  } catch (error) {
    next(error)
  }
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};

module.exports = verifySignUp;
