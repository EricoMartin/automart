"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth = _interopRequireDefault(require("../middlewares/auth"));

var _index = _interopRequireDefault(require("../middlewares/index"));

var _flags = _interopRequireDefault(require("../controllers/flags"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Route = _express["default"].Router();

Route.post('/flag/report', _auth["default"], _index["default"].CarId, _index["default"].Flag, _flags["default"].createFlag);
var _default = Route;
exports["default"] = _default;