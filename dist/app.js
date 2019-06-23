"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

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
app.listen(port, function () {
  return console.log("Automart server is running on port ".concat(port));
});
var _default = app;
exports["default"] = _default;