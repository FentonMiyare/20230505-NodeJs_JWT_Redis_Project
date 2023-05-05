const { verifySignUp } = require("../../middlewares");
const controller = require("../../controllers/auth.controller");
const { checkUser } = require('../../middlewares/authJwt')

const API_URL = "/api/v1/auth"


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.route(
    `/api/v1/auth/signup`)
    .post([
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.route(`/api/v1/auth/login`).post(controller.login);

  app.route(`/api/v1/auth/signout`).get(controller.signout);

  app.route(`/api/v1/auth/refreshtoken`).post(controller.refreshToken);

  app.route(`/api/v1/auth/userId`).post(controller.generateRandomUser)
};
