const indexController = require('../../controllers/index.controller');
const express = require('express');
const app = express();
const { checkUser } = require('../../middlewares/authJwt')
const router = express.Router();

// GET home page.
// simple route
router.get("/", indexController.indexResponse);

module.exports = router;