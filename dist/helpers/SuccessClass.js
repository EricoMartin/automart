"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var APISuccess = function APISuccess(res, statusCode, data) {
  _classCallCheck(this, APISuccess);

  this.res = res;
  this.statusCode = statusCode;
  this.data = data;
  return res.status(statusCode).send({
    status: statusCode,
    data: data
  });
};

var _default = APISuccess;
exports["default"] = _default;