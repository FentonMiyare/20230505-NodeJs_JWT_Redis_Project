require('dotenv').config();

const mongoose = require("mongoose");
const config = require("../config/auth.config");
const db = require("../models");
const { user: User, role: Role, order: Order, refreshToken: RefreshToken, file: File } = db;
const createError = require('http-errors')
const Response = require('../utils/response');
const { orderBodyValidation, uploadFileBodyValidation } = require("../utils/validationSchema")


const API_VERSION = process.env.API_VERSION;
const WEBSITE_URL = process.env.WEBSITE_URL;


exports.postOrder = async (req, res, next) => {
  const { work, category, format, level, deadline, pages, spacing, title, paperDetails } = req.body;
  console.log("INCOMING REQ", req.file)

  const { error } = orderBodyValidation(req.body);

  if (error) 
    return next(createError.UnprocessableEntity(error.details[0].message));

    const userId = req.userId
    try {
      User.findById(userId)
        .select("-password -userId")
        .populate('orders')
        .exec(async (err, user) => {
          if (err) {
            console.log(err.message)
            return next(createError.InternalServerError())
          }

          if (!user)
            return next(createError.Unauthorized("Unauthorized, user not found!"))

            new Order({
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
              user
            }).save(async (err, order) => {
                if (err) {
                  console.log("error", err);
                  return next(createError.InternalServerError())
                }

                console.log("added 'Order' to order collection");

                user.save(async (err, user) => {
                  if (err) {
                    console.log("error", err);
                    return next(createError.InternalServerError())
                  }

                  user.orders.push(order._id)
                  user.save()

                  console.log(order)
                  res.status(201)
                    .send(Response(order, true, false, `Successfully Created a new order`, 201));
                })
              });
            });
    } catch (error) {
      if (error instanceof multer.MulterError) {
        console.log(err.message)
        return next(createError.UnprocessableEntity("A Multer error occurred when uploading."))
      }

      return next(error);
    }
};


