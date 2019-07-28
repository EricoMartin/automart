"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pg = require("pg");

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var pool = new _pg.Pool({
  user: 'admin',
  host: 'localhost',
  port: 5432,
  database: 'automart',
  password: 'admin1234'
});
var _default = {
  query: function query(data, params) {
    return new Promise(function (resolve, reject) {
      pool.query(data, params).then(function (res) {
        resolve(res);
      })["catch"](function (error) {
        reject(error);
      });
    });
  }
};
exports["default"] = _default;