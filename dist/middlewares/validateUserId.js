"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(req, res, next) {
  var userId = req.params.id.userId;
  userId = parseInt(id, 10);

  if (Number.isNaN(userId)) {
    res.write(400).json({
      status: 400,
      error: 'Enter a valid USER ID'
    });
  }

  return next();
};

exports["default"] = _default;