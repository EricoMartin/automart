"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(req, res, next) {
<<<<<<< HEAD
  var carId = req.body.carId;
  carId = parseInt(carId, 10);

  if (Number.isNaN(carId)) {
    throw new Error('car id must be a number');
=======
  var car_id = req.body.car_id;
  car_id = parseInt(car_id, 10);

  if (Number.isNaN(car_id)) {
    return res.status(400).json({
      status: 400,
      message: 'car id must be a number'
    });
>>>>>>> code-refactor-travis
  }

  return next();
};

exports["default"] = _default;