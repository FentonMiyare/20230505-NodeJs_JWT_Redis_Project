const { authJwt } = require("../../middlewares");
const controller = require("../../controllers/admin.controller");
const paginationMiddleware = require('../../middlewares/sort-filter-pagination/usersFeatures.middleware');
const orderPaginationMiddleware = require('../../middlewares/sort-filter-pagination/order.middleware.js')
const db = require("../../models/index");
const { user: User, order: Order } = db;
const { checkUser } = require('../../middlewares/authJwt');
const { swaggerDocs } = require("../../v1/swagger");
const { upload } = require("../../middlewares/file-upload/upload.middleware")
const FileValidation = require("../../middlewares/validate-request-schema/file-validation");
const validateID = require("../../middlewares/validate-request-schema/id-validation");


const API_URL = "/api/v1/admin";


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

    /**
     * @api {get}  /api/v1/admin/users
     * @apiName Get users
     * @apiPermission Protected(only admin)
     * @apiGroup Admin
     *
     * @apiSuccess (200) {Object} mixed `Users` object
     */

    app.route(`${API_URL}/users`)
    .get([paginationMiddleware(User)],
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getUsers)

     app.route(`${API_URL}/user_management`)
    .get([paginationMiddleware(User)],
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getUserManagement) 

    /**
     * @api {post}  /api/v1/admin/users
     * @apiName Create new user
     * @apiPermission Protected(only admin)
     * @apiGroup Admin
     *
     * @apiParam  {String} [username] Username
     * @apiParam  {String} [email] Email
     * @apiParam  {String} [password]  Password
     * @apiParam  {String} [confirmPassword] ConfirmPassword
     * @apiParam  {String} [  role] role
     *
     * @apiSuccess (201) {Object} mixed `User` object
     */

    app.route(
    `${API_URL}/users`)
    .post([authJwt.verifyToken, authJwt.isAdmin],
    controller.adminAddUser
    );
    

  /**
     * @api {post} /api/v1/admin/orders
     * @apiName add new order
     * @apiPermission Protected(only admin)
     * @apiGroup Admin
     *
     * @apiParam  {String} [work] Work
     * @apiParam  {String} [title]  Title
     * @apiParam  {number} [pages] Pages
     * @apiParam  {String} [category] Category
     * @apiParam  {String} [paperDetails]  PaperDetails
     * @apiParam  {String} [level] Level
     * @apiParam  {String} [format] Format
     * @apiParam  {String} [deadline] Deadline
     * @apiParam  {String} [spacing] Spacing
     *
     * @apiSuccess (201) {Object} mixed `Order` object
     */

    app.route(`${API_URL}/orders`)
    .post([authJwt.verifyToken, authJwt.isAdmin],
      upload.single('fileUpload'),
      FileValidation,
    controller.adminPostOrder);

    /**
     * @api {get}  /api/v1/admin/users/userId/edit
     * @apiName Get user edit page
     * @apiPermission Protected(only admin)
     * @apiGroup Admin
     *
     * @apiSuccess (200) {Object} mixed `User` object
     */

    app.route(`${API_URL}/users/:userId/edit`)
    .get([authJwt.verifyToken, authJwt.isAdmin],
    controller.getEditPage);

    /**
     * @api {get}  /api/v1/admin/users/userId
     * @apiName Get user
     * @apiPermission Protected(only admin)
     * @apiGroup Admin
     *
     * @apiSuccess (200) {Object} mixed `User` object
     */

   app.route(`${API_URL}/users/:userId`)
    .get([authJwt.verifyToken, authJwt.isAdmin],
      validateID,
      controller.getUser)

    /**
     * @api {patch}   /api/v1/admin/users/userId
     * @apiName Update user
     * @apiPermission Protected(only admin)
     * @apiGroup Admin
     *
     * @apiParam  {String} [userId] userId
     * @apiSuccess (200) {Object} mixed `User` object
     */
   app.route(`${API_URL}/users/:userId`)
    .patch([authJwt.verifyToken, authJwt.isAdmin],
      validateID,
      upload.single('profileImage'),
      FileValidation,
      controller.updateUser)
    /**
     * @api {delete}  /api/v1/admin/users/userId
     * @apiName Delete user
     * @apiPermission Protected(only admin)
     * @apiGroup Admin
     *
     * @apiParam  {String} [userId] userId
     * @apiSuccess (200) {Object} mixed `User` object
     */
   app.route(`${API_URL}/users/:userId`)
    .delete([authJwt.verifyToken, authJwt.isAdmin],
      validateID,
      controller.deleteUser);

    /**
     * @api {get}  /api/v1/admin/orders
     * @apiName Get all orders
     * @apiPermission Protected(only admin)
     * @apiGroup Admin
     *
     * @apiSuccess (200) {Object} mixed `Order` object
     */

    app.route(`${API_URL}/orders`)
    .get([orderPaginationMiddleware(Order)],
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getOrders)

  /**
     * @api {get}  /api/v1/admin/orders/orderId
     * @apiName Get an order
     * @apiPermission Protected(only admin)
     * @apiGroup Admin
     *
     * @apiSuccess (200) {Object} mixed `Order` object
     */

    app.route(`${API_URL}/orders/:orderId`)
    .get(
      [authJwt.verifyToken, authJwt.isAdmin],
      validateID,
    controller.getOrder)

    /**
     * @api {patch}  /api/v1/admin/orders/id
     * @apiName Update order
     * @apiPermission Protected(only admin)
     * @apiGroup Admin
     *
     * @apiParam  {String} [order] order
     * @apiSuccess (200) {Object} mixed `order` object
     */

    app.route(
    `${API_URL}/orders/:orderId`)
    .patch([authJwt.verifyToken, authJwt.isAdmin],
      validateID,
      upload.single('fileUpload'),
      FileValidation,
      controller.updateOrder
    );

    /**
     * @api {get}  /api/v1/admin/orders/orderId
     * @apiName Delete an order
     * @apiPermission Protected(only admin)
     * @apiGroup Admin
     *
     * @apiSuccess (200) {Object} mixed `Order` object
     */

    app.route(
    `${API_URL}/orders/:orderId`)
    .delete([authJwt.verifyToken, authJwt.isAdmin],
      validateID,
      controller.deleteOrder
    );
}