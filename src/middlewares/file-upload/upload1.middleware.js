const multer  = require('multer');
const Storage = multer.diskStorage({
  // destination: 'public/uploads/work',
  // fileName: (req, file, cb) => {
  //   cb(null, file.originalname);
  // },
  destination: 'public/uploads/work',
  filename: (req, file, callbackFunction) => {
    callbackFunction(null, `${file.fieldname}-${Date.now()}${getFileExtension(file.mimetype)}`);
  }
})

exports.upload = multer({
  storage: Storage,
  limits: {
    fileSize: 1024 * 1024 * 10 // accept files up 10 mgb
  }
})