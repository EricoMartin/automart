"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _authRouter = _interopRequireDefault(require("./authRouter"));

var _cars = _interopRequireDefault(require("../controllers/cars"));

var _users = _interopRequireDefault(require("../controllers/users"));

var _flags = _interopRequireDefault(require("../controllers/flags"));

var _order = _interopRequireDefault(require("../controllers/order"));

var _auth = _interopRequireDefault(require("../middlewares/auth"));

var _index = _interopRequireDefault(require("../middlewares/index"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _connectMultiparty = _interopRequireDefault(require("connect-multiparty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var multiparty = (0, _connectMultiparty["default"])();
var route = (0, _express.Router)();
var options = {
  swaggerDefinition: {
    info: {
      title: 'Automart API',
      version: '1.0.0',
      description: 'Test Automart API Endpoints'
    }
  },
  apis: ['./routes/index.js']
};
var specs = (0, _swaggerJsdoc["default"])(options);
route.use('/api-docs', _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(specs));
route.use('/authrouter', _authRouter["default"]); //user signup, singin and admin signup

/**
 * @swagger
 * /users:
 *    post:
 *      description: sign up new users
 */

route.post('/auth/signup', _index["default"].Name, _index["default"].Email, _index["default"].PassWord, _users["default"].createUser);
/**
 * @swagger
 * /users:
 *    post:
 *      description: sign up new admin user
 */

route.post('/auth/admin/signup', _index["default"].Name, _index["default"].Email, _index["default"].PassWord, _users["default"].createUser);
/**
 * @swagger
 * /users
 *    post:
 *      description: user signin 
 */

route.post('/auth/signin', _index["default"].Email, _users["default"].login);
/**
 * @swagger
 * /users:
 *    get:
 *      description: user signout 
 */

route.get('/auth/logout', _index["default"].Email, _users["default"].logout);
/**
 * @swagger
 * /users:
 *    patch:
 *      description: change a user password
 */

route.patch('/user', _index["default"].Email, _users["default"].changeUserPassword); //car routes

/**
 * @swagger
 * /cars:
 *    post:
 *      description: This should post a new car ad
 */

route.post('/car', _auth["default"], multiparty, _index["default"].Car, _cars["default"].createAd);
/**
 * @swagger
 * /cars:
 *    get:
 *      description: returns a specific car ad based on search criteria
 */

route.get('/car/:id', _auth["default"], _cars["default"].findSpecificCar);
/**
 * @swagger
 * /cars:
 *    get:
 *      description: return cars based on manufacturers 
 */

route.get('/car/manufacturer/:manufacturer', _auth["default"], _index["default"].Car, _cars["default"].find);
/**
 * @swagger
 * /cars:
 *    get:
 *      description: return cars based on its bodytype
 */

route.get('/car/bodytype/:body_type', _auth["default"], _cars["default"].find);
/**
 * @swagger
 * /cars:
 *    get:
 *      description: return cars based on its state i.e New / Used
 */

route.get('/car/state/:state', _auth["default"], _cars["default"].find);
/**
 * @swagger
 * /cars:
 *    get:
 *      description: should update the car status sold, pending or available
 */

route.patch('/car/:id/status', _auth["default"], _cars["default"].updateStatus);
/**
 * @swagger
 * /cars:
 *    patch:
 *      description: should update the car ad price
 */

route.patch('/car/:id/price', _auth["default"], _cars["default"].updateCarPrice);
/**
 * @swagger
 * /cars:
 *    patch:
 *      description: should return different cars based on search query
 */

route["delete"]('/car/:id', _auth["default"], _cars["default"].deleteAd);
/**
 * @swagger
 * /cars:
 *    delete:
 *      description: should delete a car
//flag routes

/**
 * @swagger
 * /flags:
 *    post:
 *      description: This should post a reported fraudulent ad
 */

route.post('/flag/report', _auth["default"], _index["default"].CarId, _index["default"].Flag, _flags["default"].createFlag); //order routes

/**
 * @swagger
 * /orders:
 *    post:
 *      description: This should create a new purchase order
 */

route.post('/order', _auth["default"], _index["default"].CarId, _index["default"].Order, _order["default"].makeOrder);
/**
 * @swagger
 * /orders:
 *    post:
 *      description: This should update the priceof a purchase order
 */

route.patch('/order/:id/price', _auth["default"], _index["default"].NewPrice, _order["default"].updateOrder);
route.get('/', function (req, res) {
  return res.status(200).json({
    status: 'success',
    message: 'Welcome to Automart API'
  });
});
route.all('*', function (req, res) {
  return res.status(404).json({
    status: 404,
    error: 'Not Found'
  });
});
var _default = route;
exports["default"] = _default;