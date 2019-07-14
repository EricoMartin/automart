"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _car = _interopRequireDefault(require("../controllers/car"));

var _user = _interopRequireDefault(require("../controllers/user"));

var _flag = _interopRequireDefault(require("../controllers/flag"));

var _order = _interopRequireDefault(require("../controllers/order"));

var _index = _interopRequireDefault(require("../middlewares/index"));

var _auth = _interopRequireDefault(require("../middlewares/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var route = (0, _express.Router)(); //USER ENDPOINTS
//user signup

route.post('/auth/signup', _index["default"].Name, _index["default"].Email, _index["default"].PassWord, _user["default"].createUser); //user signin

route.post('/auth/signin', _auth["default"], _index["default"].Email, _index["default"].PassWord, _user["default"].login); //user signout

route.get('/auth/signout', _user["default"].logout); // change password

route.patch('/user', _auth["default"], _user["default"].changePassword); //ADMIN USER
//admin user signup

route.post('/auth/admin/signup', _index["default"].Name, _index["default"].Email, _index["default"].PassWord, _user["default"].createUser); //admin user get all users

route.get('/auth/admin/users', _auth["default"], _user["default"].getAll); //admin user get all cars

route.get('/auth/admin/cars', _auth["default"], _car["default"].getAllCars); //get all flags

route.get('/auth/admin/flags', _auth["default"], _flag["default"].getAllFlags); // update a flag

route.patch('/flag/:flag-id', _auth["default"], _flag["default"].updateFlagStatus); //admin user delete flag

route["delete"]('/auth/admin/flags/:flag-id', _auth["default"], _flag["default"].deleteFlag); //delete a car ad

route["delete"]('/auth/admin/cars/:carId', _auth["default"], _car["default"].deleteCar); //CAR ENDPOINTS
//view all unsold cars within price range

route.get('/car/price/', _car["default"].getCarPriceRange); //seller post car sale ad

route.post('/car', _auth["default"], _index["default"].Car, _car["default"].createAd); //mark posted car ad as sold

route.patch('/car/:id/status', _auth["default"], _index["default"].Email, _index["default"].PassWord, _index["default"].Order, _car["default"].updateCarAd); //update the car price

route.patch('/car/:id/price', _auth["default"], _index["default"].Email, _index["default"].PassWord, _index["default"].Order, _car["default"].updateCarAd); //get a specific car

route.get('/car/:id', _car["default"].findCarAd); //view all unsold cars

route.get('/cars/status/available', _car["default"].getAllUnsoldCars); //view all cars of a state (new or used)

route.get('/car/state/:state', _car["default"].getCarByProp); //view all car ads whether sold or available

route.get('/cars', _car["default"].getAllCars); //view all cars of a specific manufacturer

route.get('/car/manufacturer/:manufacturer', _car["default"].getCarByProp); // view all cars of a specific bodytype

route.get('/car/bodytype/:body_type', _car["default"].getCarByProp); //ORDER ENDPOINTS
//buyer post car purchase order

route.post('/order', _auth["default"], _index["default"].CarId, _index["default"].Order, _order["default"].createOrder); //update price of purchase order

route.patch('/order', _auth["default"], _index["default"].NewPrice, _order["default"].updatePrice); // view an order detail

route.get('/orders/:orderId', _auth["default"], _order["default"].getAnOrder); // delete order seller and admin can delete

route["delete"]('/orders/:orderId', _auth["default"], _order["default"].deleteAnOrder); //FLAG ENDPOINTS
//flag an ad

route.post('/flag/report', _auth["default"], _index["default"].CarId, _index["default"].Flag, _flag["default"].createFlag); //automart root route

route.get('/', function (req, res) {
  res.send({
    status: 'Successful',
    data: 'Welcome to Automart API'
  });
});
var _default = route;
exports["default"] = _default;