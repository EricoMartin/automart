"use strict";

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

(0, _chai.use)(_chaiHttp["default"]);
var API_PREFIX = '/api/v1';
describe('user can login', function (done) {
  it('should get username and password then return successful', function (done) {
    loggedInUser.request(_app["default"]).post('app/v1/auth/login').set({
      'Content-Type': 'application/json'
    }).send({
      username: 'martini',
      password: 'xxxfff546tg'
    }).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(200);
      (0, _chai.expect)(res.body.status).to.equal(200);
      (0, _chai.expect)(res.body).to.be.an('object');

      _chai.assert.strictEqual(res.body, 200, 'should return 200 status code');

      _chai.assert.strictEqual(res.statusCode, 200, 'should return 200 status code');

      _chai.assert.isString(res.body.data.username, 'username should be a string');

      _chai.assert.isNotNull(res.body.data, 'password should not be null');

      _chai.assert.isNotNull(err, 'unexpected error');

      done();
    });
  });
  it('should return error message if username and password is incorrect', function (done) {
    loggedInUser.request(_app["default"]).post('app/v1/auth/login').set({
      'Content-Type': 'application/json'
    }).send({
      username: 'martini',
      password: 'xxxfff546tg'
    }).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body.status).to.equal(400);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.error).to.equal('username or password is incorrect');

      _chai.assert.strictEqual(res.body, 400, 'should return 200 status code');

      _chai.assert.strictEqual(res.statusCode, 400, 'should return 200 status code');

      _chai.assert.strictEqual(res.body.error, incorrect, 'unexpected error', 'should return error');

      _chai.assert.isNotObject(res.body.data, 'expected an object');

      _chai.assert.isNull(res.body.data, 'username or password should not be null');

      _chai.assert.isNotNull(err, 'unexpected error');

      done();
    });
  });
});