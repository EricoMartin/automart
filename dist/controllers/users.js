"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _model = _interopRequireDefault(require("../models/model/model"));

var _ErrorClass = _interopRequireDefault(require("../helpers/ErrorClass"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_dotenv["default"].config();

var users = _model["default"].users;
/*
  * @description - create a new user
   * @params {object}
   * @returns {object}
   */

var Users =
/*#__PURE__*/
function () {
  function Users() {
    _classCallCheck(this, Users);
  }

  _createClass(Users, null, [{
    key: "createUser",
    value: function createUser(req, res) {
      try {
        var _req$body = req.body,
            firstName = _req$body.firstName,
            lastName = _req$body.lastName,
            address = _req$body.address;
        var _req$body2 = req.body,
            email = _req$body2.email,
            password = _req$body2.password; // Remove unnecessary spaces

        firstName = firstName.trim().replace(/\s+/g, '');
        lastName = lastName.trim().replace(/\s+/g, '');
        address = address.trim().replace(/\s+/g, ' '); // Encrypt password

        var encryptedPassword = _bcryptjs["default"].hashSync(password, _bcryptjs["default"].genSaltSync(10));

        var _user = users.createUser({
          firstName: firstName,
          lastName: lastName,
          encryptedPassword: encryptedPassword,
          address: address,
          email: email
        });

        if (req.originalUrl === '/api/v1/auth/admin/signup') {
          _user.isAdmin = true;
        }

        var _token = _jsonwebtoken["default"].sign({
          user: _user
        }, process.env.SECRETKEY, {
          expiresIn: '48h'
        });

        return res.status(201).json({
          status: 201,
          data: {
            token: _token,
            id: _user.id,
            first_name: _user.firstName,
            last_name: _user.lastName,
            email: _user.email,
            address: _user.address,
            is_admin: _user.isAdmin
          }
        });
      } catch (error) {
        res.status(error.statusCode || 500).json(error.message);
      }
    }
  }, {
    key: "login",
    value: function login(req, res) {
      try {
        var _req$body3 = req.body,
            email = _req$body3.email,
            password = _req$body3.password; // Check if email is present in Users array

        var found = users.allUsers.some(function (user) {
          return user.email === email;
        });

        if (!found) {
          throw new _ErrorClass["default"](400, 'Email not found');
        } // Get User using the email


        var _user2 = users.findEmail(email); // Compare password


        var comparePassword = _bcryptjs["default"].compareSync(password, _user2.encryptedPassword);

        if (!comparePassword) {
          throw new _ErrorClass["default"](400, 'Password is incorrect');
        }

        var _token2 = _jsonwebtoken["default"].sign({
          user: _user2
        }, process.env.SECRETKEY, {
          expiresIn: '48h'
        });

        res.status(200).json({
          status: 200,
          data: {
            token: _token2,
            id: _user2.id,
            first_name: _user2.firstName,
            last_name: _user2.lastName,
            email: _user2.email
          }
        });
      } catch (error) {
        res.status(error.statusCode || 500).json(error.message);
      }
    }
  }, {
    key: "changeUserPassword",
    value: function changeUserPassword(req, res) {
      try {
        var _req$params = req.params,
            id = _req$params.id,
            newUserPassword = _req$params.newUserPassword;

        var newPassword = _bcryptjs["default"].hashSync(newUserPassword, _bcryptjs["default"].genSaltSync(10));

        return res.status(200).json({
          status: 200,
          data: {
            token: token,
            id: user.id,
            encryptedPassword: newPassword
          }
        });
      } catch (error) {
        res.status(error.statusCode || 500).json(error.message);
      }
    }
  }, {
    key: "logout",
    value: function logout(req, res) {
      try {
        var id = req.params.id.id;

        if (user.id === req.params.id) {
          delete req.header.token;
          res.status(204).send({
            status: 200,
            message: 'You have logged out successfully'
          });
        } else {
          res.status(400).send({
            status: 400,
            error: 'error logging out try again'
          });
        }
      } catch (error) {
        res.status(error.statusCode || 500).json(error.message);
      }
    }
  }]);

  return Users;
}();

var _default = Users;
exports["default"] = _default;