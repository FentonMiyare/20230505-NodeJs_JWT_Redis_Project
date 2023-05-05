require('dotenv').config();

const mongoose = require("mongoose");
const createError = require('http-errors')
const db = require("../models/index");
const { 
  user: User, 
  role: Role, 
  refreshToken: RefreshToken,
  order: Order
} = db;
const {
  signUpBodyValidation,
  logInBodyValidation,
  refreshTokenBodyValidation,
  updateBodyValidation
} = require("../utils/validationSchema")
const isValidObjectId = require("../utils/IsValidMongooseObjectId")
const config = require("../config/db.config")

const express = require('express')
const multer  = require('multer')
const upload = multer({ dest: 'public/uploads/' })

const Response = require("../utils/response");
const { ObjectId } = require('mongodb');

const API_VERSION = process.env.API_VERSION;
const WEBSITE_URL = process.env.WEBSITE_URL;




exports.getAboutPage = (req, res) => {
  res.status(200)
    .render('about', { title: 'About' })
    // .send(Response({}, true, false, "Public Content.", 200))
};

exports.getContactPage = (req, res) => {
  res.status(200)
    .render('contact', { title: 'Contact' })
    // .send(Response({}, true, false, "Public Content.", 200))
};

exports.getFeaturesPage = (req, res) => {
  res.status(200)
    .render('features', { title: 'Features' })
    // .send(Response({}, true, false, "Public Content.", 200))
};

exports.getTeamPage = (req, res) => {
  res.status(200)
    .render('team', { title: 'Team' })
    // .send(Response({}, true, false, "Public Content.", 200))
};

exports.getLoginPage = (req, res) => {
  res.status(200)
    .render('login', { title: 'Login/Signup' })
    // .send(Response({}, true, false, "Public Content.", 200))
};

exports.getForgottenPasswordPage = (req, res) => {
  res.status(200)
    .render("forget-password", { title: 'Recover Password' })
};

exports.getOrderPage = (req, res) => {
  res.status(200)
    .render('order', { title: 'Order' })
    // .send(Response({}, true, false, "Public Content.", 200))
};

exports.getPrivacyPage = (req, res) => {
  res.status(200)
    .render('privacy', { title: 'Privacy' })
    // .send(Response({}, true, false, "Public Content.", 200))
};

exports.getTermsPage = (req, res) => {
  res.status(200)
    .render('terms', { title: 'Terms/Conditions' })
    // .send(Response({}, true, false, "Public Content.", 200))
};

exports.userBoard = (req, res) => {
  res.status(200)
    .render('board-user', { title: 'User' })
    // .send(Response({}, true, false, "User Content.", 200))
};

exports.adminBoard = (req, res) => {
  res.status(200)
    .render('board-admin', { title: 'Admin' });
    // .send(Response({}, true, false, "Admin Content.", 200));
};

exports.adminCreateUser = (req, res) => {
  res.status(200)
    .render('admin-createUser', { title: 'Create User' });
    // .send(Response({}, true, false, "Admin Content.", 200));
};

exports.writerBoard = (req, res) => {
  res.status(200)
    .render('board-writer', { title: 'Writer' });
    // .send(Response({}, true, false, "Writer Content.", 200));
};

exports.forgetPassword = (req, res) => {
  res.status(200)
    .render("forget-password", { title: 'Recover Password' })
};

exports.getEditPage = async (req, res) => {
  const userId = req.params.userId;

  if (!isValidObjectId(userId))
      return createError.Unauthorized('Please provide valid id');

  try {
    User.findById(userId)
      .select("-password -userId")
      .populate()
      .exec((err, user) => {
        if (err) {
          console.log(err.message);
          return next(createError.InternalServerError())
        }

        if (!user)
          return next(createError.Unauthorized("Auth failed!"));

        console.log(user)

        res.status(200)
          .render("editUser-page", { user: user, title: 'Edit Page' })
      })
  } catch (error) {
    next(error)
  }
}

exports.getUserProfile = async (req, res, next) => {
  const userId = req.userId;

  if (!isValidObjectId(userId))
    return createError.Unauthorized('Please provide valid id');

  try {
    User.findById(userId)
      .select("-password -userId")
      .populate("roles", "-__v")
      .exec((err, user) => {
        if (err) {
          console.log(err.message);
          return next(createError.InternalServerError())
        }

        if (!user)
          return next(createError.Unauthorized('Auth Failed!'))

        return res
        .status(200)
        .render("profile", { user, title: "Profile" });
      })
  } catch (error) {
    next(error)
  }
};


exports.updateUser = async (req, res, next) => {
  const userId = req.params.userId;
  const { username, email, whatsAppNumber, bio, course, nationality, favoriteColor, favoritePet } = req.body;
  console.log(req.body)
  if (!isValidObjectId(userId))
    return next(createError.Unauthorized('Please provide valid id'));

  const { error } = updateBodyValidation(req.body);

  if (error)
    return next(createError.BadRequest(error.details[0].message));

  try {
    User.findById(userId)
      // .select("-password -userId")
      .populate()
      .exec(async(err, user) => {
        if (err) {
          console.log(err.message);
          return next(createError.InternalServerError())
        }

        if (!user) 
          return next(createError.Unauthorized("Unauthorized, user not found!"))

        console.log("IMAGENAME", req.file.filename)
        // const newImage = new File({
        //   name: req.file.fieldname,
        //   file: {
        //     data: req.file.filename,
        //     contentType: req.file.mimetype
        //     }
        //   })

        //   newImage.save()

        req.user = user

        user.username = username || user.username;
        user.email = email || user.email;
        user.whatsAppNumber = whatsAppNumber || user.whatsAppNumber;
        user.bio = bio || user.bio;
        user.course = course || user.course;
        user.nationality = nationality || user.nationality;
        user.favoriteColor = favoriteColor || user.favoriteColor;
        user.favoritePet = favoritePet || user.favoritePet;
        user.profileImage = req.file.filename ? `/static/uploads/users/${req.file.filename}` : user.profileImage;

        const updatedUser = await user.save()

        return res
          .status(200)
          .send(Response(updatedUser, true, false, `Successfully updated user by ID: ${userId}`, 201));
      })
  } catch (error) {
    if (error?.code === 11000)
      return next(createError.Conflict(`The email address: ${email}, already exists, please pick a different one.`));

    next(error);
  }
}

/**
 * @desc    Get all orders
 * @route   GET /api/v1/user/orders
 * @access  User
 */

exports.getOrders = async (req, res) => {
  const userId = req.userId;

  if (!isValidObjectId(userId))
    return next(createError.Unauthorized('Please provide valid id'));

  try {
    User.findById(userId)
      .select("-password -userId")
      .exec(async (err, user) => {
        if (err) {
          console.log(err.message);
          return next(createError.InternalServerError())
        }

        if (!user) {
          return next(createError.Unauthorized("Authorization Failed!"));
        }

        const responseObject = user.orders;
        if (responseObject.length >= 1) {
          const userOrdersId = responseObject.map(doc => {
            // Pass more information  with response
            return {
              _id: doc?._id,
              request: {
                type: 'Get',
                description: 'Get one order with the id',
                url: `${WEBSITE_URL}/api/${API_VERSION}/user/orders/${doc._id}`
              }
            };
          })

          res.status(200)
            .json(Response(userOrdersId, true, false, `Successfully found ${responseObject.length} Orders.`, 200));
        } else {
          const userOrdersId =  null;

          res.status(200)
            .json(Response(userOrdersId, true, false, 'You don\'t have any orders yet.', 200));
        }
      })
  } catch (error) {
    next(error)
  }
};


/**
 * @desc     get a new order
 * @route    GET /api/v1/user/orders/orderId
 * @access   Admin
 */

exports.getOrder = async (req, res, next) => {
  let responseObject = {};
  const id = req?.params.orderId

  if (!isValidObjectId(id))
    return next(createError.Unauthorized('Please provide valid id'));

  try {
    User.findById(req.userId)
      .select("-password -userId")
      .populate("orders")
      .exec(async (err, user) => {
        if (err) {
          console.log(err.message);
          return next(createError.InternalServerError())
        }

        if (!user) {
          return next(createError.Unauthorized("Authorization Failed!"));
        }

        const order = user.orders[0]._id
        // await user.find({ order: id })
        console.log("ORDER", order)

        Order.find({ user: id })
          .populate("user")
          .exec(async (err, doc) => {
            if (err) {
              console.log(err.message);
              return next(createError.InternalServerError())
            }

            if (!doc) {
              return next(createError.BadRequest(`Failed to find order by given ID ${id}`));
            }

            const data = {
              order: {
                _id: doc?._id,
                title: doc?.title,
                work: doc?.work,
                category: doc?.category,
                format: doc?.format,
                level: doc?.level,
                deadline: doc?.deadline,
                pages: doc?.pages,
                spacing: doc?.spacing,
                category: doc?.category,
                paperDetails: doc?.paperDetails,
                user: doc?.user,
                addedDate: doc?.addedDate,
                createdAt: doc?.createdAt,
                updatedAt: doc?.updatedAt,
                request: {
                  type: 'Get',
                  description: 'Get all the products',
                  url: `${WEBSITE_URL}/api/${API_VERSION}/user/orders`
                }
              }
            };

            return res
              .status(200)
              .send(Response(data, true, false, `Successfully Found order by given id: ${id}`, 200));
            // return res
            // .status(200)
            // .render("order-profile", { order: data.order, searchOptions: req.query });
        })
      })  
  } catch (error) {
    return next(error);
  }
};