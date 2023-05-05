const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      trim: true,
      required: [true, 'Please provide username'],
      minLength: [5, "Username can't be smaller than 5 characters"],
      maxLength: [30, "Username can't be greater than 30 characters"]
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, 'Please provide email'],
      maxLength: [128, "Email can't be greater than 128 characters"],
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Please provide Password'],
      minlength: 6,
    },
    confirmPassword: {
      type: String,
      required: [true, 'Please provide confirmed Password'],
      minlength: 6,
    },
    profileImage: {
      type: String,
      required: false,
      default: '/users/temp.png',
      lowercase: true
    },
    whatsAppNumber: {
      type: String,
      maxLength: [50, "mobileNumber can't be greater than 15 characters"],
      match: [/^(\+\d{1,3}[- ]?)?\d{10}$/, "Please provide a valid number"],
      trim: true
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    // roles: {
    //   type: String,
    //   trim: true,
    //   lowercase: true,
    //   enum: ['user', 'writer', 'admin'],
    //   default: 'user'
    // },
    rating: Number,
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order' // add relationship
      }
    ],
    isVerified: {
      type: Boolean,
      default: false,
      required: false
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      enum: ['pending', 'active'],
      default: 'pending',
      required: false,
      trim: true,
      lowercase: true
    },
    bio: {
      type: String,
      maxLength: [500, "Bio can't be greater than 500 characters"],
      trim: true,
      lowercase: true,
      required: false,
    },
    course: {
      type: String,
      trim: true,
      lowercase: true,
      required: false,
    },
    nationality: {
      type: String,
      trim: true,
      lowercase: true,
      required: false,
    },
    favoriteColor: [
      {
        type: String,
        trim: true,
        lowercase: true,
        required: false,
      }
    ],
    favoritePet: [
      {
        type: String,
        trim: true,
        lowercase: true,
        required: false,
      }
    ],
    joinedDate: {
      type: Date,
      default: new Date(),
      trim: true
    },
  },
  {
    timestamps: true
  });



const User = mongoose.model("User", UserSchema)
module.exports = User;
