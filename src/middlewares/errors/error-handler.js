require("dotenv").config();

// An error handling middleware
const errorHandlerMiddleware = (error, req, res, next) => {
  res.status(error.status || 500).send({
    data: [],
    success: false,
    error: true,
    message: error.message || 'Internal Server Error',
    status: error.status || 500,
    stack: process.env.NODE_ENV === 'production' ? null : error.stack
  });
};

module.exports = errorHandlerMiddleware;
