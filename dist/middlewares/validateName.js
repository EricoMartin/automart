"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(req, res, next) {
  var _req$body = req.body,
      firstName = _req$body.firstName,
      lastName = _req$body.lastName; // Check if firstName and lastName contains a number

<<<<<<< HEAD
  if (!firstName || !lastName) {
    return res.status(400).json({
      status: 400,
      error: 'Name fields cannot be empty'
    });
  }

  var yes = "".concat(firstName).concat(lastName).split('').some(function (x) {
    return Number.isInteger(parseInt(x, 10));
  });

  if (yes) {
    return res.status(400).json({
      status: 400,
      error: 'Name cannot contain number(s)'
    });
  }

=======
>>>>>>> code-refactor-travis
  if (firstName.trim().length <= 2 || lastName.trim().length <= 2) {
    return res.status(400).json({
      status: 400,
      error: 'Name fields cannot be less than 2 characters'
    });
<<<<<<< HEAD
=======
  } else {
    if (!firstName || !lastName) {
      return res.status(400).json({
        status: 400,
        error: 'Name fields cannot be empty'
      });
    }

    var yes = "".concat(firstName).concat(lastName).split('').some(function (x) {
      return Number.isInteger(parseInt(x, 10));
    });

    if (yes) {
      return res.status(400).json({
        status: 400,
        error: 'Name cannot contain number(s)'
      });
    }
>>>>>>> code-refactor-travis
  }

  return next();
};

exports["default"] = _default;