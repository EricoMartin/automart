"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(req, res, next) {
  var newPriceOffered = req.body.newPriceOffered;
  newPriceOffered = parseFloat(newPriceOffered);

  if (Number.isNaN(newPriceOffered)) {
    return res.status(400).json({
      status: 400,
      error: 'Enter a valid price'
    });
  }

  return next();
};

exports["default"] = _default;