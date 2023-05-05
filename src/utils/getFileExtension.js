// Check Image Extension
const getFileExtension = (mimetype) => {
  switch (mimetype) {
    case 'application/pdf':
      return '.pdf';
    case 'application/doc':
      return '.doc';
    case 'image/png':
      return '.png';
    case 'image/PNG':
      return '.PNG';
    case 'image/jpg':
      return '.jpg';
    case 'image/JPG':
      return '.JPG';
    case 'image/JPEG':
      return '.JPEG';
    case 'image/jpeg':
      return '.jpeg';
    case 'image/webp':
      return '.webp';
    default:
      return false;
      break;
  }
};

module.exports = getFileExtension;
