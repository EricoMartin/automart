"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _validateName = _interopRequireDefault(require("./validateName"));

var _validateEmail = _interopRequireDefault(require("./validateEmail"));

var _validateStatus = _interopRequireDefault(require("./validateStatus"));

var _validatePrice = _interopRequireDefault(require("./validatePrice"));

var _validateCar = _interopRequireDefault(require("./validateCar"));

var _validateCarId = _interopRequireDefault(require("./validateCarId"));

var _validateOrder = _interopRequireDefault(require("./validateOrder"));

var _validateFlag = _interopRequireDefault(require("./validateFlag"));

var _validateNewPrice = _interopRequireDefault(require("./validateNewPrice"));

var _validatePassword = _interopRequireDefault(require("./validatePassword"));

var _validateUserId = _interopRequireDefault(require("./validateUserId"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  Name: _validateName["default"],
  Email: _validateEmail["default"],
  PassWord: _validatePassword["default"],
  Status: _validateStatus["default"],
  Price: _validatePrice["default"],
  Flag: _validateFlag["default"],
  Car: _validateCar["default"],
  CarId: _validateCarId["default"],
  Order: _validateOrder["default"],
  NewPrice: _validateNewPrice["default"],
  userId: _validateUserId["default"]
};
exports["default"] = _default;