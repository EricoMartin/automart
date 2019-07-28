"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(req, res, next) {
  var _req$body = req.body,
      first_name = _req$body.first_name,
      last_name = _req$body.last_name; // Check if firstName and lastName contains a number

  if (first_name.trim().length <= 2 || last_name.trim().length <= 2) {
    return res.status(400).json({
      status: 400,
      error: 'Name fields cannot be less than 2 characters'
    });
  } else {
    if (!first_name || !last_name) {
      return res.status(400).json({
        status: 400,
        error: 'Name fields cannot be empty'
      });
    }

    var yes = "".concat(first_name).concat(last_name).split('').some(function (x) {
      return Number.isInteger(parseInt(x, 10));
    });

    if (yes) {
      return res.status(400).json({
        status: 400,
        error: 'Name cannot contain number(s)'
      });
    }
  }

  return next();
};

exports["default"] = _default;