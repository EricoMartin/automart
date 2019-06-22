"use strict";

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

var _dummyDb = require("./dummy-db");

var _users = _interopRequireDefault(require("./users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

_chai["default"].use(_chaiHttp["default"]);

describe('Test user signup', function () {
  it('should create a new user', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').set({
      'Content-type': 'application/json'
    }).send(_users["default"]).end(function (err, res) {
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
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').set({
      'Content-type': 'application/json'
    }).send(_dummyDb.correctLoginDetail[0]).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(200);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.equal(200);
      (0, _chai.expect)(res.body.data).to.be.an('object');
      (0, _chai.expect)(res.body.data).to.have.property('token');
      (0, _chai.expect)(res.body.data).to.equal("Login Successful, Welcome ".concat(res.body.data.firstName));

      _chai.assert.isNotNull(err);

      done();
    });
  });
});