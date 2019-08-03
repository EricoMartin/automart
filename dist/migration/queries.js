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
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  ssl: true
});
pool.connect();
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