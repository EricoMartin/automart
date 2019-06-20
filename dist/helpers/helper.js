"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dummyDb = _interopRequireDefault(require("../test/dummy-db"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _ErrorClass = _interopRequireDefault(require("./ErrorClass"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var apiError = new _ErrorClass["default"]();
var helper = {
  ValidateEmail: function ValidateEmail(email) {
    if (!email) {
      apiError(404, 'Email Not Found');
    } else {
      var _result = false;

      if (_dummyDb["default"].email === email) {
        _result = true;
      } else {
        _result = false;
      }
    }

    return result;
  },
  ValidateSignUp: function ValidateSignUp(data, callback) {
    var statusCode = 200;
    var errMsg = '';

    if (!_dummyDb["default"].firstName) {
      apiError(400, 'firstName is not a valid input');
    }

    if (!_dummyDb["default"].lastName) {
      apiError(400, 'lastName is not a valid input');
    }

    if (!_dummyDb["default"].email) {
      apiError(400, 'email is not a valid input');
    }

    if (!_dummyDb["default"].password) {
      apiError(400, 'password is a required input');
    }

    if (!(_dummyDb["default"].password === _dummyDb["default"].confirmPassword)) {
      apiError(400, 'passwords do not match');
    }

    callback(stausCode, errMsg);
  },
  validateUserDetails: function validateUserDetails(data, callback) {
    var statusCode = 200;
    var errMsg = '';

    if (!/^[a-zA-Z -]+$/.test(_dummyDb["default"].firstName.trim())) {
      apiError(400, 'firstName must be a string');
    }

    if (!/^[a-zA-Z -]+$/.test(_dummyDb["default"].lastName.trim())) {
      apiError(400, 'lastName must be a string');
    }

    var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!regex.test(_dummyDb["default"].email.trim())) {
      apiError(400, 'emailAddress must be an email');
    }

    if (_dummyDb["default"].password.trim() === '' || typeof _dummyDb["default"].password !== 'string') {
      apiError(400, 'password must be a string');
    }

    callback(statusCode, errMsg);
  },
  ValidateLogIn: function ValidateLogIn(data, callback) {
    var statusCode = 200;
    var errMsg = '';

    if (!_dummyDb["default"].email) {
      apiError(400, 'a valid email address is required');
    }

    if (!_dummyDb["default"].password) {
      apiError(400, 'your password is required');
    }

    if (_dummyDb["default"].password.length < 5) {
      apiError(422, 'password entry is invalid, enter at least 6 characters');
    }

    callback(statusCode, errMsg);
  },
  validateCarDetails: function validateCarDetails(data, callback) {
    var statusCode = 200;
    var errMsg = '';

    if (!_dummyDb["default"].id) {
      apiError(400, 'user id must be a number');
    }

    if (!_dummyDb["default"].car_id) {
      apiError(400, 'car id must be a number');
    }

    if (!_dummyDb["default"].created_on) {
      apiError(400, 'date must be a date');
    }

    if (!_dummyDb["default"].status) {
      apiError(400, 'status is required');
    }

    if (!_dummyDb["default"].price) {
      apiError(400, 'price is required');
    }

    if (!_dummyDb["default"].price_offered) {
      apiError(400, 'price-offered is required');
    }

    callback(statusCode, errMsg);
  },
  validateOrderDetails: function validateOrderDetails(data, callback) {
    var statusCode = 200;
    var errMsg = '';

    if (!_dummyDb["default"].id) {
      apiError(400, 'user id must be a number');
    }

    if (!_dummyDb["default"].email) {
      apiError(400, 'email is required');
    }

    if (!_dummyDb["default"].created_on) {
      apiError(400, 'date must be a date');
    }

    if (!_dummyDb["default"].manufacturer) {
      apiError(400, 'manufacturer is required');
    }

    if (!_dummyDb["default"].status) {
      apiError(400, 'status is required');
    }

    if (!_dummyDb["default"].price) {
      apiError(400, 'price is required');
    }

    if (!carOrderdata.state) {
      apiError(400, 'state of the car is required');
    }

    if (!_dummyDb["default"].body_type) {
      apiError(400, 'body-type of the car is required');
    }

    callback(statusCode, errMsg);
  },
  validateFlag: function validateFlag(data, callback) {
    var statusCode = 200;
    var errMsg = '';

    if (!flagOrder.id) {
      apiError(400, 'id is required');
    }

    if (!flagOrder.car_id) {
      apiError(400, 'car_id is required');
    }

    if (!flagOrder.reason) {
      apiError(400, 'reason is required');
    }

    if (!flagOrder.description) {
      apiError(400, 'description is required');
    }

    callback(statusCode, errMsg);
  }
};
var _default = helper;
exports["default"] = _default;