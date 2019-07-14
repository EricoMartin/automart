"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(req, res, next) {
  var car_id = req.body.car_id;
  car_id = parseInt(car_id, 10);

  if (Number.isNaN(car_id)) {
    return res.status(400).json({
      status: 400,
      message: 'car id must be a number'
    });
  }

  return next();
};

exports["default"] = _default;