require('dotenv').config();

const express = require("express");
const swaggerUI = require("swagger-ui-express");
const path= require("path")
const cors = require("cors");
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const colors = require('colors');
const methodOverride = require('method-override');
const favicon = require('serve-favicon')
const YAML = require("yamljs");
const swaggerJSDocs = YAML.load("./api.yaml");
const { 
  checkUser
} = require('./src/middlewares/authJwt')
const { 
  notFoundHandlerMiddleware, 
  errorHandlerMiddleware 
} = require('./src/middlewares');

const createError = require('http-errors')
const Response = require('./src/utils/response');

const app = express();

let corsOptions = {
  origin: "http://localhost:8081"
};

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, './assets')));

// Serve all static files inside public directory.
app.use(express.static(path.join(__dirname, 'public')));

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


// Log the request
if( process.env.NODE_ENV === 'development' ){
  app.use(morgan('dev'));
}

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// Serve all static files inside public directory.
app.use('/static', express.static('public'));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJSDocs));

app.use(methodOverride('_method'))

require("./src/config/dbConnect")

// Import Routes
const indexRouter = require('./src/routes/v1/index');

// Apply this middleware to all GET request routes
app.get('*', checkUser);

// Routes which Should handle the requests
app.use('/', indexRouter);

app.get("/string", (req, res, next) => {
  console.log(req.headers);
  res.status(200).send(Response({}, true, false, `Users Routes`, 200));
});
require("./src/routes/v1/auth.routes")(app);
require("./src/routes/v1/user.routes")(app);
require("./src/routes/v1/admin.routes")(app);
require("./src/routes/v1/order.routes")(app);

app.use(notFoundHandlerMiddleware);
app.use(errorHandlerMiddleware);

// set port, listen for requests
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}.`.inverse);
});

