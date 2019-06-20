"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _order = _interopRequireDefault(require("../controllers/order"));

var _auth = _interopRequireDefault(require("../middlewares/auth"));

var _index = _interopRequireDefault(require("../middlewares/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Route = _express["default"].Router();

Route.post('/order', _auth["default"], _index["default"].CarId, _index["default"].Order, _order["default"].makeOrder);
Route.patch('/order/:id/price', _auth["default"], _index["default"].NewPrice, _order["default"].updateOrder);
var _default = Route;
exports["default"] = _default;