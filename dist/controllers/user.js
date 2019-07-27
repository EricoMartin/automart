"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _user3 = _interopRequireDefault(require("../migration/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_dotenv["default"].config();

var User = {
  createUser: function () {
    var _createUser = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res) {
      var _req$body, first_name, last_name, address, status, _req$body2, email, password, confirmedPassword, props, invalidData, body, _ref, rows, _rows$, _id, _first_name, _last_name, _hashPassword, _address, _status, _email, _token;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _req$body = req.body, first_name = _req$body.first_name, last_name = _req$body.last_name, address = _req$body.address, status = _req$body.status;
              _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password, confirmedPassword = _req$body2.confirmedPassword;
              props = [first_name, last_name, email, password, address, status, confirmedPassword];

              invalidData = function invalidData(property, data) {
                return property.find(function (idx) {
                  return data[idx] === undefined || data[idx] === '';
                });
              };

              if (invalidData(props, req.body)) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                status: 400,
                message: 'Fill all required fields'
              }));

            case 6:
              if (!(req.body.password.length < 8 || req.body.email.length >= 30 || req.body.first_name.length >= 30 || req.body.last_name.length >= 30)) {
                _context.next = 8;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                status: 400,
                message: 'Ensure password is atleast 8 characters, name and email not more than 30 characters'
              }));

            case 8:
              first_name = first_name.trim().replace(/\s+/g, '');
              last_name = last_name.trim().replace(/\s+/g, '');
              address = address.trim().replace(/\s+/g, ' ');
              status = status.trim().replace(/\s+/g, ' ');
              _context.next = 14;
              return hashPassword(req.body.password);

            case 14:
              req.body.password = _context.sent;
              _context.prev = 15;
              body = [req.body.first_name, req.body.last_name, req.body.address, req.body.is_admin, req.body.email, req.body.status, req.body.password];
              _context.next = 19;
              return _user3["default"].createUser(body);

            case 19:
              _ref = _context.sent;
              rows = _ref.rows;
              _rows$ = rows[0], _id = _rows$.id, _first_name = _rows$.first_name, _last_name = _rows$.last_name, _hashPassword = _rows$.hashPassword, _address = _rows$.address, _status = _rows$.status, _email = _rows$.email;
              _token = _jsonwebtoken["default"].sign({
                id: _id,
                is_admin: is_admin,
                first_name: _first_name
              }, process.env.SECRETKEY, {
                expiresIn: '168h'
              });
              return _context.abrupt("return", res.status(201).header('Authorization', _token).json({
                status: 201,
                data: {
                  token: _token,
                  id: user.id,
                  first_name: user.first_name,
                  last_name: user.last_name,
                  email: user.email,
                  address: user.address,
                  status: user.status,
                  is_admin: user.isAdmin
                }
              }));

            case 26:
              _context.prev = 26;
              _context.t0 = _context["catch"](15);

              if (!(_context.t0.routine === '_bt_check_unique')) {
                _context.next = 30;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                status: 400,
                message: 'User with email already exists'
              }));

            case 30:
              return _context.abrupt("return", res.status(_context.t0.statusCode || 500).json(_context.t0.message));

            case 31:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[15, 26]]);
    }));

    function createUser(_x, _x2) {
      return _createUser.apply(this, arguments);
    }

    return createUser;
  }(),
  login: function () {
    var _login = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res) {
      var _req$body3, email, password, _ref2, rows, _user, pass, _user2;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              delete req.headers['Authorization'];
              _context2.prev = 1;
              _req$body3 = req.body, email = _req$body3.email, password = _req$body3.password;
              _context2.next = 5;
              return _user3["default"].findByEmail(email);

            case 5:
              _ref2 = _context2.sent;
              rows = _ref2.rows;

              if (!(rows < 1)) {
                _context2.next = 9;
                break;
              }

              return _context2.abrupt("return", res.status(404).json({
                status: 404,
                error: 'Email not found'
              }));

            case 9:
              _context2.prev = 9;
              _user = rows[0];
              _context2.next = 13;
              return _bcrypt["default"].compare(password, _user.password);

            case 13:
              pass = _context2.sent;
              _context2.next = 19;
              break;

            case 16:
              _context2.prev = 16;
              _context2.t0 = _context2["catch"](9);
              return _context2.abrupt("return", res.status(401).json({
                status: 401,
                error: _context2.t0.message,
                message: 'Password is incorrect'
              }));

            case 19:
              _context2.prev = 19;
              _user2 = rows[0];
              _context2.next = 23;
              return _jsonwebtoken["default"].sign({
                id: id,
                is_admin: is_admin
              }, process.env.SECRETKEY, {
                expiresIn: '36h'
              });

            case 23:
              _user2.token = _context2.sent;
              return _context2.abrupt("return", res.status(200).json({
                status: 200,
                data: {
                  token: token,
                  id: _user2.id,
                  first_name: _user2.first_name,
                  last_name: _user2.last_name,
                  email: _user2.email
                }
              }));

            case 26:
              _context2.next = 31;
              break;

            case 28:
              _context2.prev = 28;
              _context2.t1 = _context2["catch"](1);
              return _context2.abrupt("return", res.status(_context2.t1.statusCode || 500).json(_context2.t1.message));

            case 31:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 28], [9, 16, 19, 26]]);
    }));

    function login(_x3, _x4) {
      return _login.apply(this, arguments);
    }

    return login;
  }(),
  getAll: function () {
    var _getAll = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(req, res) {
      var _ref3, rows;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _user3["default"].getAllUsers();

            case 3:
              _ref3 = _context3.sent;
              rows = _ref3.rows;
              return _context3.abrupt("return", res.status(200).send({
                status: 200,
                data: users
              }));

            case 8:
              _context3.prev = 8;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", res.status(_context3.t0.statusCode || 500).json(_context3.t0.message));

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 8]]);
    }));

    function getAll(_x5, _x6) {
      return _getAll.apply(this, arguments);
    }

    return getAll;
  }(),
  changePassword: function () {
    var _changePassword = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(req, res) {
      var id, _ref4, rows, confirmPassword, hashNewPassword, updatedUserDetails;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              id = req.id;

              if (!(!req.body.currentPassword || !req.body.newPassword)) {
                _context4.next = 3;
                break;
              }

              return _context4.abrupt("return", res.status(400).send({
                status: 400,
                message: 'Fill the required fields'
              }));

            case 3:
              _context4.prev = 3;
              _context4.next = 6;
              return _user3["default"].findByPass(id);

            case 6:
              _ref4 = _context4.sent;
              rows = _ref4.rows;

              if (rows[0]) {
                _context4.next = 10;
                break;
              }

              return _context4.abrupt("return", res.status(404).send({
                status: 404,
                message: 'User not found'
              }));

            case 10:
              _context4.next = 12;
              return comparePasswordSync(req.body.currentPassword, rows[0].password);

            case 12:
              confirmPassword = _context4.sent;

              if (confirmPassword) {
                _context4.next = 15;
                break;
              }

              return _context4.abrupt("return", res.status(400).send({
                status: 400,
                message: 'Incorrect current password'
              }));

            case 15:
              _context4.next = 17;
              return _bcrypt["default"].hashSync(req.body.newPassword, _bcrypt["default"].genSaltSync(10));

            case 17:
              hashNewPassword = _context4.sent;
              updatedUserDetails = _user3["default"].changePassword(id, hashNewPassword);
              return _context4.abrupt("return", res.status(201).send({
                status: 201,
                data: updatedUserDetails.rows[0]
              }));

            case 22:
              _context4.prev = 22;
              _context4.t0 = _context4["catch"](3);
              return _context4.abrupt("return", res.status(_context4.t0.statusCode || 500).json(_context4.t0.message));

            case 25:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[3, 22]]);
    }));

    function changePassword(_x7, _x8) {
      return _changePassword.apply(this, arguments);
    }

    return changePassword;
  }(),
  logout: function logout(req, res) {
    delete req.headers('Authorization', token);
    return res.status(200).send({
      status: 200,
      message: 'You have been logged out successfully'
    });
  }
};
var _default = User;
exports["default"] = _default;