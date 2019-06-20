"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var AuthRouter = (0, _express.Router)();
AuthRouter.post('/signup', function (req, res) {
  return res.status(201).json({
    success: true,
    message: 'Connected to Automart App'
  });
});
var _default = AuthRouter;
exports["default"] = _default;