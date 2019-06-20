"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(req, res, next) {
  var price = req.body.price;
  price = parseFloat(price);

  if (Number.isNaN(price)) {
    return res.status(400).json({
      status: 400,
      error: 'Enter a valid price'
    });
  }

  return next();
};

exports["default"] = _default;