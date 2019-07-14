"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

var _user = _interopRequireDefault(require("../models/user"));

var _users = _interopRequireDefault(require("./mock_db/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var expect = _chai["default"].expect;
var signupUrl = '/api/v1/auth/signup';
var loginUrl = '/api/v1/auth/signin';

_chai["default"].use(_chaiHttp["default"]);

describe('User', function () {
  var usersArray = function usersArray() {
    UserModel.users = _users["default"];
  };

  describe('User create', function () {
    it('should return a new user with the supplied properties', function (done) {
      var userDetails = {
        email: 'jason@gmail.com',
        firstName: 'Jason',
        lastName: 'Trello',
        password: 'password',
        confirmedPassword: 'password',
        address: '11, address street',
        status: 'registered'
      };

      _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send(userDetails).end(function (err, res) {
        expect(res.status).to.eq(201);
        expect(res.body.data.email).to.eq(userDetails.email);
        expect(res.body.data.address).to.eq(userDetails.address);
        done();
      });
    });
    it('should return error if password and its confirmation does not match', function (done) {
      var data = {
        email: 'James@gmail.com',
        firstName: 'Philip',
        lastName: 'Balarina',
        password: 'power',
        address: 'my address',
        status: 'registered',
        confirmedPassword: 'password'
      };

      _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send(data).end(function (err, res) {
        expect(res.status).to.eq(400);
        expect(res.body.message).to.eq('Password and confirmation does not match');
        done();
      });
    });
    it('should return error if all required fields are not supplied', function (done) {
      var data = {
        email: 'martin@gmail.com',
        firstName: 'Martin',
        password: 'password',
        address: 'my address',
        status: 'registered',
        confirmedPassword: 'password'
      };

      _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send(data).end(function (err, res) {
        expect(res.status).to.eq(400);
        expect(res.body.message).to.eq('Fill all required fields with a valid email address');
        done();
      });
    });
    it('should return error if invalid email address is supplied', function (done) {
      var data = {
        email: 'abdhaj.gmail.com',
        firstName: 'Abdallah',
        lastName: 'Hajj',
        password: 'password',
        confirmedPassword: 'password',
        status: 'registered',
        address: 'my address'
      };

      _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send(data).end(function (err, res) {
        expect(res.status).to.eq(400);
        expect(res.body.message).to.eq('Fill all required fields with a valid email address');
        done();
      });
    });
    it('should return error if length of password is less than 8 characters', function (done) {
      var data = {
        email: 'chris@gmail.com',
        firstName: 'Humphrey',
        lastName: 'Chris',
        password: 'pass',
        address: 'my address',
        status: 'registered',
        confirmedPassword: 'pass'
      };

      _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send(data).end(function (err, res) {
        expect(res.status).to.eq(400);
        expect(res.body.message).to.eq('Ensure password is atleast 6 characters, name and email not more than 30 characters');
        done();
      });
    });
  });
});