"use strict";

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

module.exports = function (req, res, next) {
  var authorization = req.headers.authorization;

  if (!authorization) {
    res.status(401).json({
      status: 401,
      error: 'Authentication failed! Please Login again'
    });
  } else {
    var token = authorization.split(' ')[1].trim();

    _jsonwebtoken["default"].verify(token, process.env.SECRETKEY, function (err, decodedData) {
      if (err) {
        res.status(401).json({
          status: 401,
          error: 'Authentication failed! Please Login again'
        });
      }

      req.authData = decodedData;
      next();
    });
  }
};