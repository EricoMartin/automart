"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

<<<<<<< HEAD
var _dotenv = _interopRequireDefault(require("dotenv"));

var _index = _interopRequireDefault(require("./routes/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var logger = require('morgan');

var express = require('express');

_dotenv["default"].config();

var app = express();
var port = process.env.PORT || 5000;
app.use(logger('dev'));
app.use(express.json());
app.use('/api/v1/', _index["default"]);
=======
var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _routes = _interopRequireDefault(require("./routes/routes"));

require("core-js/stable");

require("regenerator-runtime/runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var app = (0, _express["default"])();
var port = process.env.PORT || 5000;
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use(_express["default"].json());
app.use('/api/v1', _routes["default"]);
>>>>>>> code-refactor-travis
app.listen(port, function () {
  return console.log("Automart server is running on port ".concat(port));
});
var _default = app;
exports["default"] = _default;