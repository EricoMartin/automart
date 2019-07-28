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
//user signup ////

route.post('/auth/signup', _index["default"].Name, _index["default"].Email, _index["default"].PassWord, _user["default"].createUser); //user signin ////

route.post('/auth/signin', _index["default"].Email, _index["default"].PassWord, _user["default"].login); //user signout

route.get('/auth/signout', _user["default"].logout); // change password

route.patch('/user', _user["default"].changePassword); //ADMIN USER
//admin user get all users

route.get('/user', _user["default"].getAll); //get all flags

route.get('/flag', _flag["default"].getAllFlags); // update a flag

route.patch('/flag/:flag_id', _flag["default"].updateFlagStatus); //admin user delete flag

route["delete"]('/flag/:flag_id', _flag["default"].deleteFlag); //delete a car ad

route["delete"]('/car/:car_id', _auth["default"], _car["default"].deleteCar); //CAR ENDPOINTS
//view all unsold cars within price range ////

route.get('/car/price/', _car["default"].getCarPriceRange); //seller post car sale ad ////

route.post('/car', _auth["default"], _index["default"].Car, _car["default"].createAd); //mark posted car ad as sold

route.patch('/car/:car_id/status', _auth["default"], _car["default"].updateCarAd); //update the car price

route.patch('/car/:car_id/price', _auth["default"], _car["default"].updateCarAd); //get a specific car

route.get('/car/:car_id', _car["default"].findCarAd); //view all unsold cars

route.get('/car/status/available', _car["default"].getAllUnsoldCars); //view all cars of a state (new or used)

route.get('/car/state/:state', _car["default"].getCarByProp); //view all car ads whether sold or available ////

route.get('/car', _auth["default"], _car["default"].getAllCars); //view all cars of a specific manufacturer

route.get('/car/manufacturer/:manufacturer', _auth["default"], _car["default"].getCarByProp); // view all cars of a specific bodytype

route.get('/car/bodytype/:body_type', _auth["default"], _car["default"].getCarByProp); //ORDER ENDPOINTS
//buyer post car purchase order

route.post('/order', _auth["default"], _index["default"].CarId, _index["default"].Email, _index["default"].Order, _order["default"].createOrder);
route.get('/order', _order["default"].getAllOrders); //update price of purchase order

route.patch('/order/:order_id/price', _index["default"].NewPrice, _order["default"].updatePrice); // view an order detail

route.get('/order/:order_id', _order["default"].getAnOrder); // delete order seller and admin can delete

route["delete"]('/order/:order_id', _order["default"].deleteAnOrder); //FLAG ENDPOINTS
//flag an ad

route.post('/flag', _index["default"].CarId, _index["default"].Flag, _flag["default"].createFlag); //automart root route

route.get('/', function (req, res) {
  res.send({
    status: 'Successful',
    data: 'Welcome to Automart API'
  });
});
var _default = route;
exports["default"] = _default;