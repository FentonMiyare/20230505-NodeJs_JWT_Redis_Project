const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.refreshToken = require("./refreshToken.model");
db.order = require("./order.model");
db.file = require("./file.model");

db.ROLES = ["user","writer","admin"];

module.exports = db;