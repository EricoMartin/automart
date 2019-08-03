"use strict";

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _app = _interopRequireDefault(require("../app"));

var _queries = _interopRequireDefault(require("../migration/queries"));

var _createTable = require("../migration/createTable");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_dotenv["default"].config();

_chai["default"].use(_chaiHttp["default"]);

var token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc19hZG1pbiI6ZmFsc2UsImZpcnN0X25hbWUiOiJEb24iLCJpYXQiOjE1NjM5OTY1MDAsImV4cCI6MTU2NDYwMTMwMH0.SMCMg903d1SDuxRTYBhTWL4KPdxap__UaLUPtisOp3g';
/* eslint-disable */

before('Create Tables', function () {
  _queries["default"].query(_createTable.createTables).then(function (res) {
    return res;
  })["catch"](function (err) {
    console.log(err);
  });

  _queries["default"].query(_createTable.users_seed).then(function (res) {
    return res;
  })["catch"](function (err) {
    console.log(err);
  });

  _queries["default"].query(_createTable.cars_seed).then(function (res) {
    return res;
  })["catch"](function (err) {
    console.log(err);
  });

  _queries["default"].query(_createTable.flags_seed).then(function (res) {
    return res;
  })["catch"](function (err) {
    console.log(err);
  });

  _queries["default"].query(_createTable.orders_seed).then(function (res) {
    return res;
  })["catch"](function (err) {
    console.log(err);
  });
});
/* eslint-enable */

describe(' User Endpoint Test', function () {
  var myUser = {
    first_name: 'Jason',
    last_name: 'Trello',
    email: 'jason@gmail.com',
    password: '555SSS777',
    address: '321 upper crest park, New York, USA',
    confirmed_password: '555SSS777',
    is_admin: true
  };
  var ourUser = {
    first_name: 'Dammy',
    last_name: 'Gonzalez',
    email: '',
    password: '936379JUI',
    address: 'R280 wood west park, Milwaukee, USA',
    confirmed_password: '936379JUI',
    is_admin: false
  };
  var aUser = {
    first_name: 'limmy',
    last_name: 'lingo',
    email: 'limmy@gmail.com',
    password: '333NLSSSHHH',
    address: '4121 Hillhamton, Boston, USA',
    confirmed_password: '333NLSSSHHH',
    is_admin: false
  };
  var anUser = {
    first_name: 'Bammy',
    last_name: 'Dongodongodongodongodongodongodongodongodongo',
    email: 'bammy@gmail.com',
    password: '333BSSSHHH',
    address: '3700 Pillhamton, Boston, USA',
    confirmed_password: '333BSSSHHH',
    is_admin: false
  };
  var badEmailUser = {
    first_name: 'Gammy',
    last_name: 'Gongo',
    email: 'gammygammygammygammygammygammygammygammy@gmail.com',
    password: '333GSSSHHH',
    address: '3800 Pillhamton, Boston, USA',
    confirmed_password: '333GSSSHHH',
    is_admin: false
  };
  var badPassUser = {
    first_name: 'Pammy',
    last_name: 'Pongo',
    email: 'pammy@gmail.com',
    password: '333PSS',
    address: '3900 Pillhamton, Boston, USA',
    confirmed_password: '333PSS',
    is_admin: false
  };
  var badManUser = {
    first_name: 'Mammy',
    last_name: 'Mongo',
    email: 'mammy@gmail.com',
    password: '333MSSSHHH',
    address: '3900 Pillhamton, Boston, USA',
    confirmed_password: '333MSS',
    is_admin: false
  };
  describe('user can sign up', function () {
    it('should return 400 error if user is already signed up', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').set('authorization', token).send(myUser).then(function (res) {
        (0, _chai.expect)(res.status).to.eq(400);
        (0, _chai.expect)(res.type).to.be.equal('application/json');
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body.message).to.eq('User Email already exists');
        done();
      });
    });
    it('should return 400 error if user does not fill all required fields', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').set('authorization', token).send(ourUser).then(function (res) {
        (0, _chai.expect)(res.status).to.eq(400);
        (0, _chai.expect)(res.type).to.be.equal('application/json');
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body.message).to.eq('Email address is required');
        done();
      });
    });
    it('should return error if password is less than 8 characters', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').set('authorization', token).send(badPassUser).then(function (res) {
        (0, _chai.expect)(res.status).to.eq(400);
        (0, _chai.expect)(res.type).to.be.equal('application/json');
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body.error).to.eq('Password cannot be less than 8 characters');
        done();
      });
    });
    it('should return error if last_name or first_name is more than 30 characters', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').set('authorization', token).send(anUser).then(function (res) {
        (0, _chai.expect)(res.status).to.eq(400);
        (0, _chai.expect)(res.type).to.be.equal('application/json');
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body.message).to.eq('Ensure password is atleast 8 characters, name and email not more than 30 characters');
        done();
      });
    });
    it('should return error if email is more than 30 characters', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').set('authorization', token).send(badEmailUser).then(function (res) {
        (0, _chai.expect)(res.status).to.eq(400);
        (0, _chai.expect)(res.type).to.be.equal('application/json');
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body.message).to.eq('Ensure password is atleast 8 characters, name and email not more than 30 characters');
        done();
      });
    });
    it('should return error if password is not deeply equal to confirmed_password', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').set('authorization', token).send(badManUser).then(function (res) {
        (0, _chai.expect)(res.status).to.eq(400);
        (0, _chai.expect)(res.type).to.be.equal('application/json');
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body.message).to.eq('Ensure confirmed_password is same as password');
        done();
      });
    });
  });
  describe('User Signin', function () {
    it('should login a user and set token in the header',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var res;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').send(aUser);

            case 2:
              res = _context.sent;
              (0, _chai.expect)(res.status).to.eq(200);
              (0, _chai.expect)(res).to.have.header('authorization');

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    it('should return error 404 if user email is not found',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var res;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').send(badManUser);

            case 2:
              res = _context2.sent;
              (0, _chai.expect)(res.status).to.eq(404);
              (0, _chai.expect)(res.body.error).to.eq('Email not found');

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    it('should return error 401 if password is incorrect or not stated',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var res;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').send({
                email: 'tammy@gmail.com',
                password: '333ESS7HHH'
              });

            case 2:
              res = _context3.sent;
              (0, _chai.expect)(res.status).to.eq(401);
              (0, _chai.expect)(res.body.message).to.eq('Password is incorrect');

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
  });
  describe('user can change password', function () {
    it('should return 400 if current password is not supplied',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var res;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _chai["default"].request(_app["default"]).patch('/api/v1/user').set('authorization', token).send({
                newPassword: 'newpassword'
              });

            case 2:
              res = _context4.sent;
              (0, _chai.expect)(res.status).to.eq(400);
              (0, _chai.expect)(res.body.message).to.eq('Fill the required fields');

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
  });
});