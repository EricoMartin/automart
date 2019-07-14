"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _user = _interopRequireDefault(require("../models/user"));

var _users = _interopRequireDefault(require("../test/mock_db/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_dotenv["default"].config();

var User =
/*#__PURE__*/
function () {
  function User() {
    _classCallCheck(this, User);
  }

  _createClass(User, null, [{
    key: "createUser",
    value: function createUser(req, res) {
      var _req$body = req.body,
          firstName = _req$body.firstName,
          lastName = _req$body.lastName,
          address = _req$body.address,
          status = _req$body.status;
      var _req$body2 = req.body,
          email = _req$body2.email,
          password = _req$body2.password,
          confirmedPassword = _req$body2.confirmedPassword;
      var props = [firstName, lastName, email, password, address, status, confirmedPassword];

      var invalidData = function invalidData(property, data) {
        return property.find(function (idx) {
          return data[idx] === undefined || data[idx] === '';
        });
      };

      if (!invalidData(props, req.body)) {
        return res.status(400).json({
          status: 400,
          message: 'Fill all required fields'
        });
      }

      if (req.body.password.length < 8 || req.body.email.length >= 30 || req.body.firstName.length >= 30 || req.body.lastName.length >= 30) {
        return res.status(400).json({
          status: 400,
          message: 'Ensure password is atleast 8 characters, name and email not more than 30 characters'
        });
      }

      firstName = firstName.trim().replace(/\s+/g, '');
      lastName = lastName.trim().replace(/\s+/g, '');
      address = address.trim().replace(/\s+/g, ' ');
      status = status.trim().replace(/\s+/g, ' ');

      if (confirmedPassword !== password) {
        return res.status(400).json({
          status: 400,
          message: 'Password and confirmation does not match'
        });
      }

      try {
        var hashPassword = _bcrypt["default"].hashSync(password, _bcrypt["default"].genSaltSync(10));

        var user = _user["default"].createUser({
          firstName: firstName,
          lastName: lastName,
          hashPassword: hashPassword,
          address: address,
          status: status,
          email: email
        });

        if (req.originalUrl === '/api/v1/auth/admin/signup') {
          user.isAdmin = true;
        }

        var token = _jsonwebtoken["default"].sign({
          user: user
        }, process.env.SECRETKEY, {
          expiresIn: '36h'
        });

        return res.status(201).header('Authorization', token).json({
          status: 201,
          data: {
            token: token,
            id: user.id,
            first_name: user.firstName,
            last_name: user.lastName,
            email: user.email,
            address: user.address,
            status: user.status,
            is_admin: user.isAdmin
          }
        });
      } catch (error) {
        return res.status(error.statusCode || 500).json(error.message);
      }
    }
  }, {
    key: "login",
    value: function () {
      var _login = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var _req$body3, email, password, user, pass, token;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _req$body3 = req.body, email = _req$body3.email, password = _req$body3.password;
                user = _user["default"].findByEmail(email);

                if (user) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return", res.status(400).json({
                  status: 400,
                  error: 'Email not found'
                }));

              case 5:
                _context.prev = 5;
                pass = _bcrypt["default"].compare(password, user.hashPassword); //const pass = UserModel.findByEmailPass(email, password);

                _context.next = 12;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](5);
                return _context.abrupt("return", res.status(400).json({
                  status: 400,
                  error: _context.t0.message,
                  message: 'Password is incorrect'
                }));

              case 12:
                _context.prev = 12;
                _context.next = 15;
                return _jsonwebtoken["default"].sign({
                  user: user
                }, process.env.SECRETKEY, {
                  expiresIn: '36h'
                });

              case 15:
                token = _context.sent;
                return _context.abrupt("return", res.status(200).json({
                  status: 200,
                  data: {
                    token: token,
                    id: user.id,
                    first_name: user.firstName,
                    last_name: user.lastName,
                    email: user.email
                  }
                }));

              case 18:
                _context.next = 23;
                break;

              case 20:
                _context.prev = 20;
                _context.t1 = _context["catch"](0);
                return _context.abrupt("return", res.status(_context.t1.statusCode || 500).json(_context.t1.message));

              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 20], [5, 9, 12, 18]]);
      }));

      function login(_x, _x2) {
        return _login.apply(this, arguments);
      }

      return login;
    }()
  }, {
    key: "getAll",
    value: function getAll(req, res) {
      var users = _user["default"].getAllUsers();

      return res.status(200).send({
        status: 200,
        data: users
      });
    }
  }, {
    key: "changePassword",
    value: function changePassword(req, res) {
      var id = req.id;

      if (!req.body.currentPassword || !req.body.newPassword) {
        return res.status(400).send({
          status: 400,
          message: 'Fill the required fields'
        });
      }

      var user = _user["default"].getUser(id);

      if (!user) {
        return res.status(404).send({
          status: 404,
          message: 'User not found'
        });
      }

      try {
        var confirmPassword = comparePasswordSync(req.body.currentPassword, user.password);

        if (!confirmPassword) {
          return res.status(400).send({
            status: 400,
            message: 'Incorrect current password'
          });
        }

        var hashNewPassword = _bcrypt["default"].hashSync(req.body.newPassword, _bcrypt["default"].genSaltSync(10));

        var updatedUserDetails = _user["default"].changePassword(id, hashNewPassword);

        return res.status(201).send({
          status: 201,
          data: updatedUserDetails
        });
      } catch (error) {
        return res.status(error.statusCode || 500).json(error.message);
      }
    }
  }, {
    key: "logout",
    value: function logout(req, res) {
      return res.status(200).send({
        status: 200,
        message: 'You have been logged out successfully'
      });
    }
  }]);

  return User;
}();

var _default = User;
exports["default"] = _default;