"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(req, res, next) {
  var priceOffered = req.body.priceOffered;
  priceOffered = parseFloat(priceOffered);

  if (Number.isNaN(priceOffered)) {
    return new Error('price must be a number');
  }

  return next();
};

exports["default"] = _default;