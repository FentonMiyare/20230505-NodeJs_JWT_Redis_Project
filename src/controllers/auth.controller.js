require('dotenv').config();

const config = require("../config/auth.config");
const db = require("../models");
const { user: User, role: Role, refreshToken: RefreshToken } = db;
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const createError = require('http-errors')

const Response = require('../utils/response')
const {
  signUpBodyValidation,
  logInBodyValidation,
  refreshTokenBodyValidation,
} = require("../utils/validationSchema");
const { exec } = require('child_process');

exports.signup = async (req, res, next) => {
  console.log(req.body)
  const { error } = signUpBodyValidation(req.body);

  if (error) 
  return next(createError.UnprocessableEntity(error.details[0].message));

  try {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      confirmPassword: bcrypt.hashSync(req.body.confirmPassword, 8),
      // profileImage: req.body.profileImage,
      // whatsAppNumber: req.body.whatsAppNumber
    });
    
    user.save((err, user) => {
      if (err) {
        console.log(err.message)
        return next(createError.InternalServerError())
      }

      if (req.body.roles) {
        Role.find(
          {
            name: { $in: req.body.roles },
          },
          (err, roles) => {
            if (err) {
              console.log(err.message)
              return next(createError.InternalServerError())
            }

            user.roles = roles.map((role) => role._id);
            user.save((err) => {
              if (err) {
                console.log(err.message)
                return next(createError.InternalServerError())
              }

              res.status(201)
                .json(Response({}, false, true, "User was registered successfully!", 201));
            });
          }
        );
      } else {
        Role.findOne({ name: "user" }, (err, role) => {
          if (err) {
            console.log(err.message)
            return next(createError.InternalServerError())
          }

          user.roles = [role._id];
          user.save((err) => {
            if (err) {
              console.log(err.message)
              return next(createError.InternalServerError())
            }

            res.status(201)
              .json(Response({}, false, true, "Registration successful, please check your email for verification instructions", 201));
          });
        });
      }
    });
  } catch (error) {
    if (error?.code === 11000) {
      return createError.Conflict("E-Mail address already exists, please pick a different one.");
    }
    
    next(error)
  }
};

exports.login = (req, res, next) => {
  const { error } = logInBodyValidation(req.body);
  
  if (error) 
    return next(createError.UnprocessableEntity(error.details[0].message));

  try {
     User.findOne({
      username: req.body.username,
    })
    .populate("roles", "-__v")
    .exec(async (err, user) => {
      if (err) {
        console.log(err.message)
        return next(createError.InternalServerError())
      }

      if (!user)
        return next(createError.Unauthorized("Unauthorized, user not found!"))

      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) 
        return next(createError.Unauthorized('Username/Password not valid'))

      let token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: config.jwtExpiration,
      });

      let refreshToken = await RefreshToken.createToken(user);

      res.cookie("jwt", token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 });

      // let authorities = [];

      // for (let i = 0; i < user.roles.length; i++) {
      //   authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      // }

      res.status(200).send(Response(user, true, false, "Successfully Logged in!", 200));
    });
  } catch (error) {
      next(error)
  }
};

exports.refreshToken = async (req, res, next) => {
  const { refreshToken: requestToken } = req.body;

  const { error } = refreshTokenBodyValidation({ refreshToken: requestToken });
    
  if (error) 
    return next(createError.UnprocessableEntity(error.details[0].message));

  if (requestToken == null)
    return next(createError.Forbidden("Refresh Token is required!"));

  try {
    RefreshToken.findOne({ token: requestToken })
      .populate()
      .exec((err, refreshToken) => {
        if (!refreshToken) 
          return next(createError.Forbidden("Refresh token is not in database!"))

        if (RefreshToken.verifyExpiration(refreshToken)) {
          RefreshToken.findByIdAndRemove(refreshToken._id, { useFindAndModify: false }).exec();
          // throw createError.Forbidden("Refresh token was expired. Please make a new signin request")
          res.redirect("/");
        }

        let newAccessToken = jwt.sign({ id: refreshToken.user._id }, config.secret, {
          expiresIn: config.jwtExpiration,
        });

        return res.status(200).send(Response({
          accessToken: newAccessToken,
          refreshToken: refreshToken.token,
        }, true, false, "Token sent succefully", 200));
      })
  } catch (error) {
    next(error)
  }
};

exports.signout = async (req, res, next) => {
    res.cookie("jwt", "", { maxAge: 1 });
      res.redirect("/");
  }

/**
 * @desc    generate random uses
 * @route   POST /api/v1/auth/userId
 * @access  Private
 */

exports.generateRandomUser = async (req, res) => {
  // declare all characters
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const telNumbers = '0123456789';

  function generateString(param, length) {
    let result = '';
    const charactersLength = param.length;
    for (let i = 0; i < length; i++) {
      result += param.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  function generateRanNo(num) {
    return Math.floor(Math.random() * num)
  }

  for (let i = 0; i < 1000; i++) {
    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      username: `user${generateString(characters, 3)}`,
      email: `${generateString(characters, 5)}nh@gmail.com`,
      password: 'Abc123',
      confirmPassword: 'Abc123',
      profileImage: `/users/${generateRanNo(99)}.jpg`,
      whatsAppNumber: `${generateString(telNumbers, 10)}`
    });

    try {
      const user = newUser.save(async (err, user) => {
        if (err) {
          console.log(err.message)
          return next(createError.InternalServerError())
        }

        if (req.body.roles) {
          Role.find(
            {
              name: { $in: req.body.roles },
            },
            (err, roles) => {
              if (err) {
                console.log(err.message)
                return next(createError.InternalServerError())
              }

              user.roles = roles.map((role) => role._id);
              user.save((err) => {
                if (err) {
                  console.log(err.message)
                  return next(createError.InternalServerError())
                }
              });
            }
          );
        } else {
          Role.findOne({ name: "user" }, (err, role) => {
            if (err) {
              console.log(err.message)
              return next(createError.InternalServerError())
            }

            user.roles = [role._id];
            user.save((err) => {
              if (err) {
                console.log(err.message)
                return next(createError.InternalServerError())
              }
            });
          });
        }
      });

      console.log(i);
    } catch (error) {
      console.log(error.message);
    }
  }
};