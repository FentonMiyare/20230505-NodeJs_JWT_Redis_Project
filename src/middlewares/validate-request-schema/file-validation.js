const getFileExtension = require("../../utils/getFileExtension")
const createError = require('http-errors')
const isValidObjectId = require('../../utils/IsValidMongooseObjectId.js');


const FileValidation = async (req, res, next) => {
    const orderFile = req?.file;
    const isValidFile = getFileExtension(req?.file?.mimetype);
    const userId = req?.userId;
  
    if (!isValidObjectId(userId)) {
      return next(createError.Unauthorized())
    } else if (!orderFile || !isValidFile) {
      return next(createError.UnprocessableEntity('Invalid request, please upload a vaild File type (png / jpg /jpeg / webp / doc / pdf)'))
    }
  
      next();
  };

module.exports = FileValidation