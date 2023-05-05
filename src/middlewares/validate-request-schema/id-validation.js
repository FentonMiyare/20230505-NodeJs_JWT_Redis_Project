const createError = require('http-errors')
const isValidObjectId = require('../../utils/IsValidMongooseObjectId.js');


const validateID = async (req, res, next) => {
    const givenId = req.params?.userId || req.params?.orderId;
    if (!givenId || !givenId?.trim()) {
      return next(createError.UnprocessableEntity('Id is required'));
    } else if (!isValidObjectId(givenId)) {
      return next(createError.UnprocessableEntity('Please provide valid id'));
    }
    next();
  };

  module.exports = validateID