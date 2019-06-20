"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(req, res, next) {
  var _req$body = req.body,
      firstname = _req$body.firstname,
      lastname = _req$body.lastname; // Check if firstname and lastname contains a number

  if (!firstname || !lastname) {
    return res.status(400).json({
      status: 400,
      error: 'Name fields cannot be empty'
    });
  }

  var yes = "".concat(firstname).concat(lastname).split('').some(function (x) {
    return Number.isInteger(parseInt(x, 10));
  });

  if (yes) {
    return res.status(400).json({
      status: 400,
      error: 'Name cannot contain number(s)'
    });
  }

  if (firstname.trim().length <= 2 || lastname.trim().length <= 2) {
    return res.status(400).json({
      status: 400,
      error: 'Name fields cannot be less than 2 characters'
    });
  }

  return next();
};

exports["default"] = _default;