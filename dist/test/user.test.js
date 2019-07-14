"use strict";

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

var _users = _interopRequireDefault(require("./users"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

//import {userDetail, incorrectUserDetail, correctLoginDetail, incorrectLoginDetail} from './dummy-db';
_dotenv["default"].config();

_chai["default"].use(_chaiHttp["default"]);

describe('Test user signup', function () {
  it('should create a new user', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').set({
      'Content-type': 'application/x-www-form-urlencoded',
      Accept: 'application/json'
    }).send({
      firstName: 'Jason',
      lastName: 'Trello',
      password: '555SSS777',
      email: 'jason@gmail.com',
      address: '321 upper crest park, New York, USA'
    }).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(201);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.equal(201);
      (0, _chai.expect)(res.body.data).to.be.an('object');
      (0, _chai.expect)(res.body.data.token).to.be.a('string');
      (0, _chai.expect)(res.body.data.id).to.be.an('number');
      (0, _chai.expect)(res.body.data.firstName).to.be.a('string');
      (0, _chai.expect)(res.body.data.lastName).to.be.a('string');

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
      'Content-type': 'application/x-www-form-urlencoded',
      Accept: 'application/json'
    }).send({
      firstName: 'Jason',
      lastName: 'Trello',
      password: '555SSS777',
      email: 'jason@gmail.com',
      address: '321 upper crest park, New York, USA'
    }).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(201);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.equal(201);
      (0, _chai.expect)(res.body.email).to.not.be('null');
      (0, _chai.expect)(res.body.error).to.equal('Email already exists, please signin');

      _chai.assert.isNotNull(res.body.email);

      _chai.assert.isNotNull(err);

      done();
    });
  });
});
describe('Test user Login', function () {
  it('should perform a user login when registered email exists', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').set({
      'Content-type': 'application/x-www-form-urlencoded',
      Accept: 'application/json'
    }).send({
      password: '555SSS777',
      email: 'jason@gmail.com'
    }).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.equal(400);
      (0, _chai.expect)(res.body.data).to.be.an('object');
      (0, _chai.expect)(res.body.data).to.have.property('token');
      (0, _chai.expect)(res.body.data).to.equal('email exists');

      _chai.assert.isNotNull(err);

      done();
    });
  });
});
describe('Test for sign up endpoint', function () {
  it('should create an admin', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/admin/signup').set({
      Accept: 'application/json'
    }).send({
      firstName: 'Jason',
      lastName: 'Trello',
      password: '555SSS777',
      address: '321, upper crest park, New York, USA',
      email: 'jason@gmail.com',
      isAdmin: true
    }).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(201);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.equal(201);
      (0, _chai.expect)(res.body.data).to.be.an('object');
      (0, _chai.expect)(res.body.data.token).to.be.a('string');
      (0, _chai.expect)(res.body.data.id).to.be.an('number');
      (0, _chai.expect)(res.body.data.first_name).to.be.a('string');
      (0, _chai.expect)(res.body.data.last_name).to.be.a('string');
      (0, _chai.expect)(res.body.data.is_admin).to.be.a('boolean');
      (0, _chai.expect)(res.body.data.is_admin).to.equal(true);

      _chai.assert.strictEqual(res.statusCode, 201, 'Status code is not 201');

      _chai.assert.strictEqual(res.body.status, 201, 'Status is not 201');

      _chai.assert.isObject(res.body, 'Response is not an object');

      _chai.assert.isObject(res.body.data, 'Data is not an object');

      _chai.assert.isString(res.body.data.token, 'Token is not a string');

      _chai.assert.isNumber(res.body.data.id, 'ID is not a number');

      _chai.assert.isString(res.body.data.firstName, 'Firstname is not a string');

      _chai.assert.isString(res.body.data.lastName, 'Last name is not a string');

      _chai.assert.isBoolean(res.body.data.isAdmin, 'isAdmin type is not boolean');

      _chai.assert.strictEqual(res.body.data.isAdmin, true, 'isAdmin is not true');

      _chai.assert.isNull(err, 'Expect error to not exist');

      done();
    });
  });
  it('Should return an error message if firstname is empty', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').set({
      'Content-type': 'application/x-www-form-urlencoded',
      Accept: 'application/json'
    }).send({
      firstName: '',
      lastName: 'Trello',
      password: '555SSS777',
      email: 'jason@gmail.com',
      address: '321 upper crest park, New York, USA'
    }).end(function (err, res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.equals(400);
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body.error).to.equals('Name fields cannot be empty');

      _chai.assert.isObject(res.body, 'Response is not an object');

      _chai.assert.strictEqual(res.statusCode, 400, 'Status code is not 400');

      _chai.assert.strictEqual(res.body.status, 400, 'Status is not 400');

      _chai.assert.strictEqual(res.body.error, 'Name fields cannot be empty', 'Expect error to be Name fields cannot be empty');

      _chai.assert.isNull(err, 'Expect error to not exist');

      done();
    });
  });
  it('Should return an error message if name contains a number', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').set({
      Accept: 'application/json'
    }).send({
      firstName: 'Jason25',
      lastName: 'Trello',
      password: '555SSS777',
      email: 'jason@gmail.com',
      address: '321 upper crest park, New York, USA'
    }).end(function (err, res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.equals(400);
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body.error).to.equals('Name cannot contain number(s)');

      _chai.assert.isObject(res.body, 'Response is not an object');

      _chai.assert.strictEqual(res.statusCode, 400, 'Status code is not 400');

      _chai.assert.strictEqual(res.body.status, 400, 'Status is not 400');

      _chai.assert.strictEqual(res.body.error, 'Name cannot contain number(s)', 'Expect error to be Name cannot contain number(s)');

      _chai.assert.isNull(err, 'Expect error to not exist');

      done();
    });
  });
  it('Should return an error message if firstname is less than 2 characters', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').set({
      'Content-type': 'application/x-www-form-urlencoded',
      Accept: 'application/json'
    }).send({
      firstName: 'o',
      lastName: 'Trello',
      password: '555SSS777',
      email: 'jason@gmail.com',
      address: '321 upper crest park, New York, USA'
    }).end(function (err, res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.equals(400);
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body.error).to.equals('Name fields cannot be less than 2 characters');

      _chai.assert.isObject(res.body, 'Response is not an object');

      _chai.assert.strictEqual(res.statusCode, 400, 'Status code is not 400');

      _chai.assert.strictEqual(res.body.status, 400, 'Status is not 400');

      _chai.assert.strictEqual(res.body.error, 'Name fields cannot be less than 2 characters', 'Expect error to be Name fields cannot be less than 2 characters');

      _chai.assert.isNull(err, 'Expect error to not exist');

      done();
    });
  });
  it('Should return an error message if lastname is empty', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').set({
      'Content-type': 'application/x-www-form-urlencoded',
      Accept: 'application/json'
    }).field('firstName', 'Jason').field('lastName', '').field(' email', 'jason@gmail.com').field('address', '321 upper crest park, New York, USA').end(function (err, res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.equals(400);
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body.error).to.equals('Name fields cannot be empty');

      _chai.assert.isObject(res.body, 'Response is not an object');

      _chai.assert.strictEqual(res.statusCode, 400, 'Status code is not 400');

      _chai.assert.strictEqual(res.body.status, 400, 'Status is not 400');

      _chai.assert.strictEqual(res.body.error, 'Name fields cannot be empty', 'Expect error to be Name fields cannot be empty');

      _chai.assert.isNull(err, 'Expect error to not exist');

      done();
    });
  });
  it('Should return an error message if lastname is less than 2 characters', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').set({
      'Content-type': 'application/x-www-form-urlencoded',
      Accept: 'application/json'
    }).send({
      firstName: 'Jason',
      lastName: 'T',
      password: '555SSS777',
      email: 'jason@gmail.com',
      address: '321 upper crest park, New York, USA'
    }).end(function (err, res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.equals(400);
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body.error).to.equals('Name fields cannot be less than 2 characters');

      _chai.assert.isObject(res.body, 'Response is not an object');

      _chai.assert.strictEqual(res.statusCode, 400, 'Status code is not 400');

      _chai.assert.strictEqual(res.body.status, 400, 'Status is not 400');

      _chai.assert.strictEqual(res.body.error, 'Name fields cannot be less than 2 characters', 'Expect error to be Name fields cannot be less than 2 characters');

      _chai.assert.isNull(err, 'Expect error to not exist');

      done();
    });
  });
  it('Should return an error message if password is empty', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').set({
      'Content-type': 'application/x-www-form-urlencoded',
      Accept: 'application/json'
    }).send({
      firstName: 'Jason',
      lastName: 'Trello',
      password: '',
      email: 'jason@gmail.com',
      address: '321 upper crest park, New York, USA'
    }).end(function (err, res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.equals(400);
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body.error).to.equals('Password field cannot be empty');

      _chai.assert.isObject(res.body, 'Response is not an object');

      _chai.assert.strictEqual(res.statusCode, 400, 'Status code is not 400');

      _chai.assert.strictEqual(res.body.status, 400, 'Status is not 400');

      _chai.assert.strictEqual(res.body.error, 'Password field cannot be empty', 'Expect error to be Password field cannot be empty');

      _chai.assert.isNull(err, 'Expect error to not exist');

      done();
    });
  });
  it('Should return an error message if password is less than 8 characters', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').set({
      'Content-type': 'application/x-www-form-urlencoded',
      Accept: 'application/json'
    }).send({
      firstName: 'Jason',
      lastName: 'Trello',
      password: '555SS',
      email: 'jason@gmail.com',
      address: '321 upper crest park, New York, USA'
    }).end(function (err, res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body.status).to.equals(400);
      (0, _chai.expect)(res.body.error).to.equals('Password cannot be less than 8 characters');

      _chai.assert.isObject(res.body, 'Response is not an object');

      _chai.assert.strictEqual(res.statusCode, 400, 'Status code is not 400');

      _chai.assert.strictEqual(res.body.status, 400, 'Status is not 400');

      _chai.assert.strictEqual(res.body.error, 'Password cannot be less than 8 characters', 'Expect error to be Password field cannot be empty');

      _chai.assert.isNull(err, 'Expect error to not exist');

      done();
    });
  });
  it('Should return an error message if email is not valid', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').set({
      'Content-type': 'application/x-www-form-urlencoded',
      Accept: 'application/json'
    }).field('firstName', 'Jason').field('lastName', 'Trello').field(' email', 'jasoncom').field('address', '321 upper crest park, New York, USA').field(' password', '555SSS777').end(function (err, res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.equals(400);
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body.error).to.equals('Please provide a valid email address');

      _chai.assert.isObject(res.body, 'Response is not an object');

      _chai.assert.strictEqual(res.statusCode, 400, 'Status code is not 400');

      _chai.assert.strictEqual(res.body.status, 400, 'Status is not 400');

      _chai.assert.strictEqual(res.body.error, 'Please provide a valid email address', 'Expect error to be Please provide a valid email address');

      _chai.assert.isNull(err, 'Expect error to not exist');

      done();
    });
  });
});
describe('Test sign in endpoint', function () {
  it('should log the user in', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').set({
      Accept: 'application/json'
    }).send({
      password: '555SSS777',
      email: 'jason@gmail.com'
    }).end(function (err, res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.statusCode).to.equal(200);
      (0, _chai.expect)(res.body.status).to.equal(200);
      (0, _chai.expect)(res.body.data).to.be.an('object');
      (0, _chai.expect)(res.body.data.token).to.be.a('string');
      (0, _chai.expect)(res.body.data.id).to.be.an('number');
      (0, _chai.expect)(res.body.data.first_name).to.be.a('string');
      (0, _chai.expect)(res.body.data.first_name).to.be.a('string');

      _chai.assert.strictEqual(res.statusCode, 200, 'Status code is not 200');

      _chai.assert.strictEqual(res.body.status, 200, 'Status is not 200');

      _chai.assert.isObject(res.body, 'Response is not an object');

      _chai.assert.isObject(res.body.data, 'Data is not an object');

      _chai.assert.isString(res.body.data.token, 'Token is not a string');

      _chai.assert.isNumber(res.body.data.id, 'ID is not a number');

      _chai.assert.isString(res.body.data.firstName, 'Firstname is not a string');

      _chai.assert.isString(res.body.data.firstName, 'Last name is not a string');

      _chai.assert.isNull(err, 'Expect error to not exist');

      done();
    });
  });
  it('should return an error if email is not found', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').set({
      'Content-type': 'application/x-www-form-urlencoded',
      Accept: 'application/json'
    }).send({
      password: '555SSS777',
      email: 'jasc@gmail.com'
    }).end(function (err, res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body.status).to.equal(400);
      (0, _chai.expect)(res.body.error).to.equal('Please provide a valid email address');

      _chai.assert.isObject(res.body, 'Response is not an object');

      _chai.assert.strictEqual(res.statusCode, 400, 'Status code is not 400');

      _chai.assert.strictEqual(res.body.status, 400, 'Status is not 400');

      _chai.assert.strictEqual(res.body.error, 'Please provide a valid email address', 'Expect error to be Please provide a valid email address');

      _chai.assert.isNull(err, 'Expect error to not exist');

      done();
    });
  });
  it('should return an error if password is wrong', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').set({
      'Content-type': 'application/x-www-form-urlencoded',
      Accept: 'application/json'
    }).send({
      password: '',
      email: 'jason@gmail.com'
    }).end(function (err, res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body.status).to.equal(400);
      (0, _chai.expect)(res.body.error).to.equal('Please provide a valid email address');

      _chai.assert.isObject(res.body, 'Response is not an object');

      _chai.assert.strictEqual(res.statusCode, 400, 'Status code is not 400');

      _chai.assert.strictEqual(res.body.status, 400, 'Status is not 400');

      _chai.assert.strictEqual(res.body.error, 'Please provide a valid email address', 'Expect error to be Please provide a valid email address');

      _chai.assert.isNull(err, 'Expect error to not exist');

      done();
    });
  });
});