const jwt = require("jsonwebtoken");
const createError = require('http-errors')
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

const Response = require("../utils/response");

const { TokenExpiredError } = jwt;


const verifyToken = (req, res, next) => {
  try {
    let token = req.headers["x-access-token"] || req.cookies.jwt;

    if (!token)
      throw createError.Forbidden("No token provided!");

    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        if (err instanceof TokenExpiredError) {
          return next(createError.Unauthorized("Unauthorized! Access Token was expired!"))
        }
                
        return next(createError.Unauthorized("Unauthorized!"))
      }

      req.userId = decoded.id;
      next();
    });
  } catch (error) {
    next(error)
  }
  
};

const checkUser = (req, res, next) => {
  let accessToken = req.headers["x-access-token"] || req.cookies.jwt;
  
  try {
    if (accessToken) {
      jwt.verify(accessToken, config.secret, async (err, decodedToken) => {
        if (err) {
          res.locals.user = null;
          next()
        } else {
          let user = await User.findById(decodedToken.id);
          // Whatever is created in the "locals" object will be accessible from the views
          res.locals.user = user;
          
          next();
        }
      });
    } else {
      res.locals.user = null;
      next();
    }
  } catch (error) {
    return next(createError.InternalServerError)
  }
};

const isAdmin = (req, res, next) => {
  try {
    User.findById(req.userId).exec((err, user) => {
      if (err)
        next(createError.InternalServerError(err))

      Role.find(
        {
          _id: { $in: user.roles }
        },
        (err, roles) => {
          if (err)
            next(createError.InternalServerError(err))

          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "admin") {
              next();
              return;
            }
          }

          next(createError.Forbidden("Require Admin Role!"))
        }
      );
    });
  } catch (error) {
    next(error)
  }
};

const isWriter = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    try {
      if (err)
        next(createError.InternalServerError(err))

      Role.find(
        {
          _id: { $in: user.roles }
        },
        (err, roles) => {
          if (err)
            next(createError.InternalServerError(err))

          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "writer") {
              next();
              return;
            }
          }

          next(createError.Forbidden("Require Writer Role!"))
        }
      );
    } catch (error) {
      next(error)
    }
  });
};

const authJwt = {
  verifyToken,
  checkUser,
  isAdmin,
  isWriter
};
module.exports = authJwt;
