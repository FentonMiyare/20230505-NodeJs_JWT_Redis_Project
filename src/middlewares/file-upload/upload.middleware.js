const multer = require('multer');

const getFileExtension = require("../../utils/getFileExtension")

// Set Storage Engine
// Configuring and validating the upload
const storage = multer.diskStorage({
  destination: (req, file, callbackFunction) => {
    const { isUserImg } = req.body;
    
    if (file?.fieldname === 'profileImage') {
      callbackFunction(null, 'public/uploads/users');
    } else if (file?.fieldname === 'fileUpload') {
      callbackFunction(null, 'public/uploads/work');
    } else {
      callbackFunction(null, 'public/uploads');
    }
  },

  // By default, multer removes file extensions so let's add them back
  filename: (req, file, callbackFunction) => {
    callbackFunction(null, `${file.fieldname}-${Date.now()}${getFileExtension(file.mimetype)}`);
  }
});

// Initialize upload variable
exports.upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10 // accept files up 10 mgb
  }
});
