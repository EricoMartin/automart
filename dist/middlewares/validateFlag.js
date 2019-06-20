"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(req, res, next) {
  var _req$body = req.body,
      reason = _req$body.reason,
      description = _req$body.description;

  if (!reason) {
    return res.status(400).json({
      status: 400,
      error: 'Reason field cannot be empty'
    });
  }

  if (!description) {
    return res.status(400).json({
      status: 400,
      error: 'Description field cannot be empty'
    });
  }

  return next();
};

exports["default"] = _default;