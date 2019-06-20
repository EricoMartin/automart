"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _model = _interopRequireDefault(require("../models/model/model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_dotenv["default"].config();

var User = _model["default"].User;
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
      var _req$body = req.body,
          firstname = _req$body.firstname,
          lastname = _req$body.lastname,
          address = _req$body.address;
      var _req$body2 = req.body,
          email = _req$body2.email,
          password = _req$body2.password; // Remove unnecessary spaces

      firstname = firstname.trim().replace(/\s+/g, '');
      lastname = lastname.trim().replace(/\s+/g, '');
      address = address.trim().replace(/\s+/g, ' '); // Encrypt password

      var encryptedPassword = _bcryptjs["default"].hashSync(password, _bcryptjs["default"].genSaltSync(10));

      var user = User.createUser({
        firstname: firstname,
        lastname: lastname,
        encryptedPassword: encryptedPassword,
        address: address,
        email: email
      });

      if (req.originalUrl === '/api/v1/auth/admin/signup') {
        user.isAdmin = true;
      }

      var token = _jsonwebtoken["default"].sign({
        user: user
      }, process.env.SECRETKEY, {
        expiresIn: '48h'
      });

      return res.status(201).json({
        status: 201,
        data: {
          token: token,
          id: user.id,
          first_name: user.firstname,
          last_name: user.lastname,
          email: user.email,
          address: user.address,
          is_admin: user.isAdmin
        }
      });
    }
  }, {
    key: "login",
    value: function login(req, res) {
      var _req$body3 = req.body,
          email = _req$body3.email,
          password = _req$body3.password; // Check if email is present in Users array

      var found = User.allUsers.some(function (user) {
        return user.email === email;
      });

      if (!found) {
        return res.status(400).json({
          status: 400,
          error: 'Email not found'
        });
      } // Get User using the email


      var user = User.findEmail(email); // Compare password

      var comparePassword = _bcryptjs["default"].compareSync(password, user.encryptedPassword);

      if (!comparePassword) {
        res.status(400).json({
          status: 400,
          error: 'Password is incorrect'
        });
      }

      var token = _jsonwebtoken["default"].sign({
        user: user
      }, process.env.SECRETKEY, {
        expiresIn: '48h'
      });

      return res.status(200).json({
        status: 200,
        data: {
          token: token,
          id: user.id,
          first_name: user.firstname,
          last_name: user.lastname,
          email: user.email
        }
      });
    }
  }, {
    key: "changeUserPassword",
    value: function changeUserPassword(req, res) {
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
    }
  }, {
    key: "logout",
    value: function logout(req, res) {
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
    }
  }]);

  return Users;
}();

var _default = Users;
exports["default"] = _default;