"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(req, res, next) {
  var status = req.body.status;
  status = status.trim().replace(/\s+/g, '');

  if (!status) {
    return res.status(400).json({
      status: 400,
      error: 'Status cannot be empty'
    });
  }

  if (status.split('').some(function (x) {
    return Number.isInteger(parseInt(x, 10));
  })) {
    return res.status(400).json({
      status: 400,
      error: 'Status cannot contain number(s)'
    });
  }

  return next();
};

exports["default"] = _default;