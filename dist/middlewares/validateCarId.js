"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(req, res, next) {
  var carId = req.body.carId;
  carId = parseInt(carId, 10);

  if (Number.isNaN(carId)) {
    throw new Error('car id must be a number');
  }

  return next();
};

exports["default"] = _default;