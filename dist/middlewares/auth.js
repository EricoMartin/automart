"use strict";

<<<<<<< HEAD
=======
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

>>>>>>> code-refactor-travis
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

<<<<<<< HEAD
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
=======
var _default = function _default(req, res, next) {
  var authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({
      status: 401,
      error: 'Authentication failed! Please Login again'
    });
  }

  var token = authorization.split(' ')[1].trim();

  try {
    var decodedData = _jsonwebtoken["default"].verify(token, process.env.SECRETKEY);

    req.authData = decodedData;
    return next();
  } catch (err) {
    return res.status(401).json({
      status: 401,
      error: 'Authentication failed! Please Login again'
    });
  }
};

exports["default"] = _default;
>>>>>>> code-refactor-travis
