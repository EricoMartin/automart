"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(req, res, next) {
  var price = req.params.price;

  if (Number.isNaN(price)) {
    return res.status(400).json({
      status: 400,
      error: 'Enter a valid price'
    });
  }

  if (price > 10000000) {
    return res.status(400).json({
      status: 400,
      error: 'Enter a price below 10,000,000'
    });
  }

  return next();
};

exports["default"] = _default;