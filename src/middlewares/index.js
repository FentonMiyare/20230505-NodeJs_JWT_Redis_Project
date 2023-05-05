const authJwt = require("./authJwt");
const verifySignUp = require("./verifySignUp");
const userPaginatedResults = require("./sort-filter-pagination/usersFeatures.middleware")
const errorHandlerMiddleware = require("./errors/error-handler")
const notFoundHandlerMiddleware = require("./errors/not-found")

module.exports = {
  authJwt,
  verifySignUp,
  userPaginatedResults,
  errorHandlerMiddleware,
  notFoundHandlerMiddleware
};
