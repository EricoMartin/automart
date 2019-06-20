"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ErrorClass = _interopRequireDefault(require("/Helpers/ErrorClass"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AuthMiddlewares =
/*#__PURE__*/
function () {
  function AuthMiddlewares() {
    _classCallCheck(this, AuthMiddlewares);
  }

  _createClass(AuthMiddlewares, null, [{
    key: "validateParams",
    value: function validateParams(req, res, next) {
      try {
        if (!req.body.firstName) {
          throw (0, _ErrorClass["default"])(400, 'First Name is required');
        }

        next();
      } catch (error) {
        res.status(error.statusCode || 500).json({
          status: error.statusCode || 500,
          message: error.message
        });
      }
    }
  }]);

  return AuthMiddlewares;
}();

exports["default"] = AuthMiddlewares;