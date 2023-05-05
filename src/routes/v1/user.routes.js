const { authJwt } = require("../../middlewares");
const controller = require("../../controllers/user.controller");
const paginationMiddleware = require('../../middlewares/sort-filter-pagination/usersFeatures.middleware');
const orderPaginationMiddleware = require('../../middlewares/sort-filter-pagination/order.middleware.js')
const db = require("../../models/index");
const { user: User, order: Order } = db;
const { checkUser } = require('../../middlewares/authJwt');
const { upload } = require("../../middlewares/file-upload/upload.middleware")
const FileValidation = require("../../middlewares/validate-request-schema/file-validation");
const validateID = require("../../middlewares/validate-request-schema/id-validation");



const API_URL = "/api/v1/user"


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, access_token");
    res.header("Access-Control-Allow-Methods","PUT, GET, POST, OPTIONS, DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // app.get("/api/v1/login", controller.signup)

  app.get("/login", controller.getLoginPage)

  app.get("/forget-password", controller.forgetPassword)

  app.get("/about", controller.getAboutPage);

  app.get("/contact", controller.getContactPage);

  app.get("/features", controller.getFeaturesPage);

  app.get("/order-page", controller.getOrderPage);

  app.get("/privacy", controller.getPrivacyPage);

  app.get("/terms", controller.getTermsPage);

  app.get("/team", controller.getTeamPage);

  app.route(`${API_URL}`)
    .get([authJwt.verifyToken],
   controller.userBoard);

  app.route(`${API_URL}/me`)
    .get([authJwt.verifyToken],
    controller.getUserProfile);

  app.route(
    "/api/v1/writer")
    .get([authJwt.verifyToken, authJwt.isWriter],
    controller.writerBoard
  );

  app.route("/api/v1/admin")
    .get([authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard);

  app.route(`/api/v1/admin/create_user`)
  .get([authJwt.verifyToken, authJwt.isAdmin],
    controller.adminCreateUser)

  /**
 * @api  {get}  /api/v1/user/orders
 * @apiName Get orders
 * @apiPermission Private
 * @apiGroup User
 *
 * @apiParam  {String} [id] order
 * @apiSuccess (200) {Object} mixed `order` object
 */

  app.route(`${API_URL}/orders`)
    .get([authJwt.verifyToken],
    controller.getOrders);

  app.route(`${API_URL}/:userId/edit`)
    .get([authJwt.verifyToken],
    controller.getEditPage);

 app.route(`${API_URL}/orders/:orderId`)
    .get([authJwt.verifyToken],
      validateID,
    controller.getOrder);

  app.route(`${API_URL}/:userId`)
    .patch([authJwt.verifyToken],
      validateID,
      upload.single('profileImage'),
      FileValidation,
    controller.updateUser);
};
