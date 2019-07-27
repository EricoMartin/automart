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
  user: DB_USER,
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME,
  password: DB_PASSWORD
});
var _default = pool;
exports["default"] = _default;