"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _cars = _interopRequireDefault(require("../controllers/cars"));

var _auth = _interopRequireDefault(require("../middlewares/auth"));

var _index = _interopRequireDefault(require("../middlewares/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Route = _express["default"].Router();

Route.post('/car', _auth["default"], _index["default"].Car, _cars["default"].createAd);
Route.get('/car/:id', _auth["default"], _cars["default"].findSpecificCar);
Route.get('/car/', _auth["default"], _cars["default"].find);
Route.patch('/car/:id/status', _auth["default"], _index["default"].Status, _cars["default"].updateStatus);
Route.patch('/car/:id/price', _auth["default"], _index["default"].Price, _cars["default"].updateCarPrice);
Route["delete"]('/car/:id', _auth["default"], _cars["default"].deleteAd);
var _default = Route;
exports["default"] = _default;