"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(req, res, next) {
  var carId = req.body.carId;
  carId = parseInt(carId, 10);

  if (Number.isNaN(carId)) {
    res.write(400).json({
      status: 400,
      error: 'Enter a valid ID'
    });
  }

  return next();
};

exports["default"] = _default;