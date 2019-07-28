"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _routes = _interopRequireDefault(require("./routes/routes"));

require("regenerator-runtime/runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Require which and child_process
var which = require('which');

var spawn = require('child_process').spawn; // Find npm in PATH


var npm = which.sync('npm'); // Execute

var noErrorSpawn = spawn(npm, ['install']);

_dotenv["default"].config();

var app = (0, _express["default"])();
var port = process.env.PORT || 5000;
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(_express["default"].json());
app.use('/api/v1', _routes["default"]);
app.listen(port, function () {
  return console.log("Automart server is running on port ".concat(port));
});
var _default = app;
exports["default"] = _default;