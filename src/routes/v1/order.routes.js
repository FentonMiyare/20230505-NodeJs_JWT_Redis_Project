const { authJwt } = require("../../middlewares");
const controller = require("../../controllers/order.controller");
const paginationMiddleware = require('../../middlewares/sort-filter-pagination/order.middleware');
const db = require("../../models/index");
const { user: User, order: Order } = db;
const { upload } = require("../../middlewares/file-upload/upload.middleware")
const FileValidation = require("../../middlewares/validate-request-schema/file-validation")

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, access_token");
    res.header("Access-Control-Allow-Methods","PUT, GET, POST, OPTIONS, DELETE");
    next();
  });

     /**
     * @api  {Post}  /api/v1/orders
     * @apiName add an order
     * @apiPermission Private
     * @apiGroup User
     *
     * @apiSuccess (200) {Object} mixed `product` object
     */
    app.route('/api/v1/orders')
    .post([authJwt.verifyToken],
      upload.single('fileUpload'),
      FileValidation,
    controller.postOrder);
}