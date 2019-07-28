"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(req, res, next) {
  var price_offered = req.body.price_offered;

  if (!price_offered) {
    return res.status(400).json({
      status: 400,
      message: 'price_offered is required'
    });
  }

  price_offered = parseFloat(price_offered);

  if (Number.isNaN(price_offered)) {
    return new Error('price must be a number');
  }

  return next();
};

exports["default"] = _default;