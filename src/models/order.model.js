const mongoose = require('mongoose');
const API_VERSION = process.env.API_VERSION;
const WEBSITE_URL = process.env.WEBSITE_URL;

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    work: String,
    category: String,
    format: String,
    level: String,
    deadline: String,
    pages: String,
    spacing: String,
    title: {
      type: String,
      trim: true,
      lowercase: true,
      required: false,
      default: "Writers's Choice"
    },
    paperDetails: {
      type: String,
      maxLength: 600,
      required: false,
      default: "",
      trim: true
    },
    fileUpload: [
      {
        type: String,
        required: false,
        lowercase: true
      }
    ],
    price: String,
    isCompleted: {
      type: Boolean,
      default: false
    },
    addedDate: {
      type: Date,
      default: new Date()
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, 'User is required']
    },
},
  {
    timestamps: true
  });

OrderSchema.statics.createOrder = async function (userOrder, user) {

  let _object = new this({
        _id: userOrder._id,
        title: userOrder.title,
        work: userOrder.work, 
        category: userOrder.category, 
        format: userOrder.format, 
        level: userOrder.level, 
        deadline: userOrder.deadline, 
        pages: userOrder.pages, 
        spacing: userOrder.spacing,
        paperDetails: userOrder.paperDetails,
        fileUpload: userOrder.fileUpload,
        addedDate: userOrder.addedDate,
        createdAt: userOrder.createdAt,
        updatedAt: userOrder.updatedAt,
        user: user,
        request: {
          type: 'Get',
          description: 'Get  all orders',
          url: `${WEBSITE_URL}/api/${API_VERSION}/admin/orders`
        }
      });

  let order = await _object.save();

  // console.log(order)
  return order;
};

// OrderSchema.pre('findById', function(next) {
//   User.find({ order: this._id}, (err, user) => {
//     if (err) {
//       next(err)
//     } else if (User.orders.length <= 0) {
//       next(new Error("You don't have any orders"))
//     } else {
//       next()
//     }
//   })
// })


mongoose.set('useFindAndModify', false);
// Compile model from schema and Exported
module.exports = mongoose.models.Order || mongoose.model('Order', OrderSchema);