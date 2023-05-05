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
const ROLES = db.ROLES;
const {
  signUpBodyValidation,
  logInBodyValidation,
  refreshTokenBodyValidation,
  updateBodyValidation
} = require("../utils/validationSchema")
const isValidObjectId = require("../utils/IsValidMongooseObjectId")
const config = require("../config/db.config");
const authController = require("./auth.controller.js")

const Response = require("../utils/response");
const express = require('express')
const multer  = require('multer')
const upload = multer({ dest: 'public/uploads/' })

const API_VERSION = process.env.API_VERSION;
const WEBSITE_URL = process.env.WEBSITE_URL;


exports.getUsers = async (req, res, next) => {  
  try {
    const { results, next, previous, currentPage, totalDocs, totalPages, lastPage } = res.paginatedResults;

    const users = {
      totalDocs: totalDocs || 0,
      totalPages: totalPages || 0,
      lastPage: lastPage || 0,
      count: results?.length || 0,
      currentPage: currentPage || 0
    };

    if (next) {
      users.nextPage = next;
    }
    if (previous) {
      users.prevPage = previous;
    }

    users.users = results.map(user => {
      return {
        _id: user._id,
        username: user?.username,
        email: user?.email,
        profileImage: user?.profileImage,
        whatsAppNumber: user?.whatsAppNumber,
        roles: user?.roles
      };
    });

    return res
      .status(200)
      // .send(Response(users, true, false, 'Successfully Found users', 200));
      .render("users-timeline", { users, searchOptions: req.query });
  } catch (error) {
    next(error)
  }
};

exports.getUser = async (req, res, next) => {
  let responseObj = {};
  const userId = req.params.userId;

  if (!isValidObjectId(userId))
      return createError.Unauthorized('Please provide valid id');

  try {
    const user = await User.findById(userId)
      .select("-password -userId")
      .populate("roles", "-__v");
      
    if (!user)
      throw createError.BadRequest(`User with given ID: ${userId}, does not exist!`);

    const data = {
      user: {
        _id: user.id,
        username: user.username,
        email: user.email,
        profileImage: user?.profileImage,
        whatsAppNumber: user?.whatsAppNumber,
        order: user?.orders,
        createdAt: user?.createdAt,
        updatedAt: user?.updatedAt,
        roles: user?.roles,
        request: {
          type: 'Get',
          description: 'Get one user',
          url: `${config.WEBSITE_URL}/api/${config.API_VERSION}/admin/users`, // `${WEBSITE_URL}/api/${API_VERSION}/admin/users`
        }
      }
    };

    // return res
    //   .status(200)
    //   .send(Response(user, true, false, `Successfully found user by ID: ${userId}`, 200, {}));
    return res
      .status(200)
      .render("profile", { user: user, searchOptions: req.query });
  } catch (error) {
    next(error);
  }
}

exports.getEditPage = (req, res) => {
  const userId = req.params.userId;

  if (!isValidObjectId(userId))
    return next(createError.Unauthorized('Please provide valid id'));

  try {
    User.findById(userId)
      .populate()
      .exec((err, user) => {
        if (err) {
          console.log(err.message);
          return next(createError.InternalServerError())
        }

        if (!user)
          return next(createError.Unauthorized("Authorization failed!"));

        console.log(user)

        res.status(200)
          .render("editUser-page", { user: user, title: 'Edit Page' })
      })
  } catch (error) {
    next(error)
  }
}

exports.adminAddUser = async (req, res, next) => {
  const signupController = await authController.signup(req, res, next);
  return res.status(signupController.status).send(signupController);
  // Response.status()
}

exports.getUserManagement = (req, res) => {
  const page = parseInt(req.query.page) - 1 || 0;
  const limit = parseInt(req.query.limit) || 20;

  try {
    User.find()
      .populate()
      .skip(page*limit)
      .limit(limit)
      .exec((err, users) => {
        if (err) {
          console.log(err.message)
          return next(createError("Internal Server Error!"))
        }

        // console.log(users)h
        res.status(200)
          .render('user-management', { users, title: 'User Management' })
      })
  } catch (error) {
    
  }
};

/**
 * @desc     Update user
 * @route    PATCH /api/v1/user/userId or/api/v1/admin/users/userId
 * @access   Private
 */

exports.updateUser = async (req, res, next) => {
  const userId = req.params.userId;
  const { username, email, whatsAppNumber, profileImage, bio, course, nationality, favoriteColor, favoritePet } = req.body;

  const { error } = updateBodyValidation(req.body);

  if (error)
    return next(createError.BadRequest(error.details[0].message));

  try {
    User.findById(userId)
      .select("-password -userId")
      .populate()
      .exec(async(err, user) => {
        if (err) {
          console.log(err.message);
          return next(createError.InternalServerError())
        }

        if (!user) 
          return next(createError.Unauthorized("Unauthorized, user not found!"))

        console.log("IMAGENAME", req.file.filename)
        const newImage = new File({
          name: req.body.fileUpload,
          file: {
            data: req.file.fileName,
            contentType: req.file.mimetype
            }
          })

          newImage.save()

        req.user = user

        user.username = username || user.username;
        user.email = email || user.email;
        user.whatsAppNumber = whatsAppNumber || user.whatsAppNumber;
        user.profileImage = profileImage || user.profileImage;
        user.roles = Role || user.roles;
        user.bio = bio || user.bio;
        user.course = course || user.course;
        user.nationality = nationality || user.nationality;
        user.favoriteColor = favoriteColor || user.favoriteColor;
        user.favoritePet = favoritePet || user.favoritePet

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
 * @desc     Delete user
 * @route    DELETE /api/v1/admin/users/userId
 * @access   Private
 */

exports.deleteUser = async (req, res, next) => {
  let toDelUser
  const userId = req.params.userId

  if (!isValidObjectId(userId))
    return next(createError.Unauthorized('Please provide valid id'));

  try {
    User.findByIdAndRemove({ _id: userId })
      .exec((err, user) => {
        if (err) {
          console.log(err)
          return next(createError.InternalServerError())
        }
        
        if (!user)
          throw createError.BadRequest(`Failed to delete user by given ID ${userId}`)

        return res
          .status(200)
          .send(Response([], true, false, `Successfully deleted user with ID: ${userId}`, 200, {}));
      })
  } catch (error) {
    next(error)
  }
}


/**
 * @desc    Get all orders
 * @route   GET /api/v1/admin/orders
 * @access  Admin
 */

exports.getOrders = (req, res) => {
  const { results, next, previous, currentPage, totalDocs, totalPages, lastPage } = res.paginatedResults;

  const orders = {
    totalDocs: totalDocs || 0,
    totalPages: totalPages || 0,
    lastPage: lastPage || 0,
    count: results?.length || 0,
    currentPage: currentPage || 0
  };

  if (next) {
    orders.nextPage = next;
  }
  if (previous) {
    orders.prevPage = previous;
  }

  orders.orders = results.map(doc => {
    // Pass more information  with response
    return {
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
      fileUpload: doc?.fileUpload,
      addedDate: doc?.addedDate,
      createdAt: doc?.createdAt,
      updatedAt: doc?.updatedAt,
      user: doc?.user,
      request: {
        type: 'Get',
        description: 'Get one order with the id',
        url: `${WEBSITE_URL}/api/${API_VERSION}/admin/orders/${doc._id}`
      }
    };
  });

  // res.status(200)
  //   .json(Response(orders.orders, true, false, 'Successful Orders.', 200));
  return res
      .status(200)
      .render("orders-timeline", { orders: orders.orders, searchOptions: req.query });
};


/**
 * @desc     get a new order
 * @route    GET /api/v1/admin/orders/orderId
 * @access   Admin
 */

exports.getOrder = async (req, res, next) => {
  let responseObject = {};
  const id = req?.params.orderId
  console.log(id)

  if (!isValidObjectId(id))
    return next(createError.Unauthorized('Please provide valid id'));
  
  try {
    Order.findById(id)
      .populate("user")
      .exec(async (err, order) => {
        if (err) {
          console.log(err.message);
          return next(createError.InternalServerError())
        }

        if (!order) {
          return next(createError.BadRequest(`Failed to find order by given ID ${id}`));
        }

        User.findOne({ _id: order.user })
          .select("-password -id")
          .populate("roles", "-__v")
          .exec(async (err, user) => {
            if (err) {
              console.log(err.message);
              return next(createError.InternalServerError())
            }
          
            if (!user) {
              return next(createError.Unauthorized("Authorization Failed!"));
            }

            return res
            .status(200)
            // .send(Response(order, user, true, false, `Successfully Found order by given id: ${id}`, 200));
            .render("order-profile", { order, user, searchOptions: req.query });
        })
      })
  } catch (error) {
    return next(error);
  }
};


/**
 * @desc     add Order to orders list
 * @route    Post /api/v1/admin/orders
 * @access   admin
 */

exports.adminPostOrder = async (req, res, next) => {
  const { work, category, format, level, deadline, pages, spacing, title, paperDetails } = req.body;
  const { userId } = req
    
  try {
    const authUser = await User.findById(userId);
    if (!authUser) {
      return next(createError.Unauthorized("Unauthorized, user not found!"));
    }

    const Order = new Order({
      _id: new mongoose.Types.ObjectId(),
      work,
      category,
      format,
      level,
      deadline,
      pages,
      spacing,
      title,
      paperDetails,
      fileUpload: req.file.filename,
    })

    Order.save(async (err, Order) => {
      if (err) {
        console.log(err.message)
        return next(createError.InternalServerError())
      }
      
      Order.save(async (err) => {
        if (err) {
          console.log(err.message)
          return next(createError.InternalServerError())
        }

        let order = await Order.createOrder(authUser, Order);

        let data = {
          order: order
        }

        res.status(201)
          .send(Response(data, true, false, `Thank you! Your order has been successfully posted.`, 201));
      })
    })
    
  } catch (error) {
    return next(error);
 }
};


/**
 * @desc       Update product
 * @route     PATCH /api/v1/admin/orders/orderId
 * @access    Private
 */

exports.updateOrder = async (req, res, next) => {
  let responseObject = {};
  const { title, work, category, pages, deadline, format, paperDetails, spacing, level } = req.body;

  const id = req.params.orderId;
  const errors = validationResult(req);

  try {
    const order = await Order.findById(id);
    if (!order) {
      return next(createError.BadRequest(`Database Update Failure (Failed to find product by given ID ${id})`));
    }

    order.title = title || order.title;
    order.work = work || order.work;
    order.category = category || order.category;
    order.pages = pages || order.pages;
    order.paperDetails = paperDetails || order.paperDetails;
    order.level = level || order.level;
    order.deadline = deadline || order.deadline;
    order.format = format || order.format;
    order.spacing = spacing || order.spacing;


    const updatedOrder = await order.save();

    const data = {
      product: {
        title: updatedOrder.title,
        work: updatedOrder.work,
        pages: updatedOrder.pages,
        _id: updatedOrder._id,
        deadline: updatedOrder.deadline,
        pages: updatedOrder.pages,
        spacing: updatedOrder.spacing,
        level: updatedOrder.level,
        category: updatedOrder.category,
        format: updatedOrder.format,
        user: {
          _id: req.user._id,
          username: req.user.username,
          email: req.user.email,
          whatsAppNumber: req.user.whatsAppNumber,
          createdAt: req.user?.createdAt,
          updatedAt: req.user?.updatedAt,
          roles: req.user?.roles,
          profileImage: req.user?.profileImage
        },
        request: {
          type: 'Get',
          description: 'Get  all orders',
          url: `${WEBSITE_URL}/api/${API_VERSION}/orders`
        }
      }
    };

    return Response(data, true, false, `Successfully updated products by ID: ${order}`, 201);
  } catch (error) {
    // 500 Internal Server Error
    return next(error);
  }
};



/**
 * @desc     Delete product
 * @route    DELETE /api/v1/admin/orders/orderId
 * @access   Private
 */

exports.deleteOrder = async (req, res, next) => {
  const id = req?.params.orderId
  const userId = req.userId

  if (!isValidObjectId(id))
    return next(createError.Unauthorized('Please provide valid id'));

  try {
    Order.findById(id)
      .populate("user")
      .exec(async (err, order) => {
        if (err) {
          console.log(err.message);
          return next(createError.InternalServerError())
        }

        if (!order) {
          return next(createError.BadRequest(`Failed to find order by given ID ${id}`));
        }

        User.findOne({ _id: order.user })
          .select("-password -id")
          .populate("roles", "-__v")
          .exec(async (err, user) => {
            if (err) {
              console.log(err.message);
              return next(createError.InternalServerError())
            }
          
            if (!user) {
              return next(createError.Unauthorized("User not found!"));
            }

            user.remove({ order: id })
            Order.findByIdAndRemove(id)

            res.redirect('/api/v1/admin/orders')

            return res
            .status(200)
            // .send(Response(order, user, true, false, `Successfully Found order by given id: ${id}`, 200));
            // .render("order-profile", { order, user, searchOptions: req.query });
        })
      })




    // const toBeDeletedOrder = await Order.findByIdAndRemove(id);

    // if (!toBeDeletedOrder) {
      // return next(createError.BadRequest(`Failed to delete order by given ID ${req.params.orderId}`));
    // }

    // return Response([], true, false, `Successfully deleted order by ID ${req.params.orderId}`, 200);
  } catch (error) {
    return next(error);
  }
};