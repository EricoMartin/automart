"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _index = _interopRequireDefault(require("../middlewares/index"));

var _users = _interopRequireDefault(require("../controllers/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Route = _express["default"].Router();

Route.post('/auth/signup', _index["default"].Name, _index["default"].Email, _index["default"].PassWord, _users["default"].createUser);
Route.post('/auth/admin/signup', _index["default"].Name, _index["default"].Email, _index["default"].PassWord, _users["default"].createUser);
Route.post('/auth/signin', _index["default"].Email, _users["default"].login);
var _default = Route;
exports["default"] = _default;