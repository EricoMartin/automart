"use strict";

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

var _dummyDb = require("./dummy-db");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

_chai["default"].use(_chaiHttp["default"]);

describe('Test user signup', function () {
  it('should create a new user', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').set({
      'Content-type': 'application/json'
    }).send(_dummyDb.userDetail).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(201);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.equal(201);
      (0, _chai.expect)(res.body.data).to.be.an('object');
      (0, _chai.expect)(res.body.data.token).to.be.a('string');
      (0, _chai.expect)(res.body.data.id).to.be.an('number');
      (0, _chai.expect)(res.body.data.first_name).to.be.a('string');
      (0, _chai.expect)(res.body.data.last_name).to.be.a('string');

      _chai.assert.strictEqual(res.statusCode, 201, 'Status code is not 201');

      _chai.assert.strictEqual(res.body.status, 201, 'Status is not 201');

      _chai.assert.isObject(res.body, 'Response is not an object');

      _chai.assert.isObject(res.body.data, 'Data is not an object');

      _chai.assert.isString(res.body.data.token, 'Token is not a string');

      _chai.assert.isNumber(res.body.data.id, 'ID is not a number');

      _chai.assert.isString(res.body.data.firstName, 'First name is not a string');

      _chai.assert.isString(res.body.data.lastName, 'Last name is not a string');

      _chai.assert.isNull(err, 'Expect error to not exist');

      done();
    });
  });
});
describe('Test existing registered user', function () {
  it('should create an error when email exists', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').set({
      'Content-type': 'application/json'
    }).send(_dummyDb.incorrectUserDetail[0]).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(409);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.equal(409);
      (0, _chai.expect)(res.body.error).to.be.an('object');
      (0, _chai.expect)(res.body.error).to.equal('Email already exists');

      _chai.assert.isNotNull(err);

      done();
    });
  });
});
describe('Test user Login', function () {
  it('should perform a user login when registered email exists', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/login').set({
      'Content-type': 'application/json'
    }).send(_dummyDb.correctLoginDetail[0]).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(200);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.equal(200);
      (0, _chai.expect)(res.body.data).to.be.an('object');
      (0, _chai.expect)(res.body.data).to.have.property('token');
      (0, _chai.expect)(res.body.data).to.equal("Login Successful, Welcome ".concat(res.body.data.firstName));
      done();
    });
  });
});
describe('Test user signup without details', function () {
  it('should return an error message', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send(badSignUpDetail[1]).end(function (err, res) {
      (0, _chai.expect)(res.body.status).to.equal(400);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.error).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.equal(400);
      (0, _chai.expect)(res.body.error).to.be.a('object');
      (0, _chai.expect)(res.body.error.firstName).to.equal('The firstName field is required.');
      (0, _chai.expect)(res.body.error.lastName).to.equal('The lastName field is required.');
      (0, _chai.expect)(res.body.error.email).to.equal('The Email field is required.');
      (0, _chai.expect)(res.body.error.address).to.equal('The address field is required.');
      (0, _chai.expect)(res.body.error.password).to.equal('The password field is required.');
      (0, _chai.expect)(res.body.error.confirmPassword).to.equal('The password confirmation field is required.');
      done();
    });
  });
});
describe('Test user not signed up trying to login', function () {
  it('should return an error message if user attempts to login and  is not signed up', function (done) {
    _chai["default"].request(_app["default"]).post('api/v1/auth/login').send(_dummyDb.incorrectLoginDetail[0]).end(function (err, res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.equal(403);
      (0, _chai.expect)(res.body.error).to.be.an('object');
      (0, _chai.expect)(res.body.error).to.equal(403);
      (0, _chai.expect)(res.body.error).to.equal('Invalid username or password');
      done();
    });
  });
});
describe('Test Signed up user providing empty email', function () {
  it('should return an error message', function (done) {
    _chai["default"].request(_app["default"]).post("api/v1/auth/login").send(_dummyDb.incorrectLoginDetail[2]).end(function (err, res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.equal(400);
      (0, _chai.expect)(res.body.error).to.be.an('object');
      (0, _chai.expect)(res.body.error).to.equal(400);
      (0, _chai.expect)(res.body.status).to.have.property('email');
      (0, _chai.expect)(res.body.status).to.equal(400);
      (0, _chai.expect)(res.body.error.email).to.equal('The email field is required.');
      done();
    });
  });
});
describe('Test Signed up user providing wrong password', function () {
  it('should return status code 403 and send an error message', function (done) {
    _chai["default"].request(_app["default"]).post("api/v1/auth/login").send(_dummyDb.incorrectLoginDetail[1]).end(function (err, res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.equal(403);
      (0, _chai.expect)(res.body.error).to.be.an('object');
      (0, _chai.expect)(res.body.error).to.equal(400);
      (0, _chai.expect)(res.body.status).to.equal(403);
      (0, _chai.expect)(res.body.error).to.equal('Invalid username or password');
      done();
    });
  });
});