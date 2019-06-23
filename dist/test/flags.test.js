"use strict";

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _chai = _interopRequireWildcard(require("chai"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_chai["default"].use(_chaiHttp["default"]);

describe('Test flag endpoint', function () {
  it('Should create a flag', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/flag/report').set({
      'Content-Type': 'application/json'
    }).send({
      car_Id: 13,
      reason: 'Image not availble',
      description: 'Image not available for the AD'
    }).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(201);
      (0, _chai.expect)(res.body.status).to.equal(201);
      (0, _chai.expect)(res.body.data).to.be.an('object');
      (0, _chai.expect)(res.body.data.id).to.be.a('number');
      (0, _chai.expect)(res.body.data.car_id).to.be.a('number');
      (0, _chai.expect)(res.body.data.reason).to.be.a('string');
      (0, _chai.expect)(res.body.data.description).to.be.a('string');

      _chai.assert.strictEqual(res.statusCode, 201, 'Status code is not 201');

      _chai.assert.strictEqual(res.body.status, 201, 'Status is not 201');

      _chai.assert.isObject(res.body.data, 'Data is not an object');

      _chai.assert.isNumber(res.body.data.id, 'ID is not a number');

      _chai.assert.isNumber(res.body.data.car_id, 'Car ID is not a number');

      _chai.assert.isString(res.body.data.reason, 'Reason is not a string');

      _chai.assert.isString(res.body.data.description, 'Description is not a string');

      _chai.assert.isNull(err, 'Expect error to not exist');

      done();
    });
  });
  it('Should return an error car Id is not a number', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/flag/report').set({
      'Content-Type': 'application/json'
    }).send({
      carId: 'bbb10000043',
      reason: 'Image not availble',
      description: 'Image is not available for the AD'
    }).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body.status).to.equal(400);
      (0, _chai.expect)(res.body.error).to.equal('Enter a valid ID');

      _chai.assert.strictEqual(res.statusCode, 400, 'Status code is not 400');

      _chai.assert.strictEqual(res.body.status, 400, 'Status is not 400');

      _chai.assert.strictEqual(res.body.error, 'Enter a valid ID', 'Expect error to be Enter a valid ID');

      _chai.assert.isNull(err, 'Expect error to not exist');

      done();
    });
  });
  it('Should return an error message if reason is empty', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/flag/report').set({
      'Content-Type': 'application/json'
    }).send({
      carId: 10000043,
      reason: '',
      description: 'Image is not available for the AD'
    }).end(function (err, res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.equals(400);
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body.error).to.equals('Reason field cannot be empty');

      _chai.assert.isObject(res.body, 'Response is not an object');

      _chai.assert.strictEqual(res.statusCode, 400, 'Status code is not 400');

      _chai.assert.strictEqual(res.body.status, 400, 'Status is not 400');

      _chai.assert.strictEqual(res.body.error, 'Reason field cannot be empty');

      _chai.assert.isNull(err, 'Expect error to not exist');

      done();
    });
  });
  it('Should return an error message if description is empty', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/flag/report').set({
      'Content-Type': 'application/json'
    }).send({
      car_Id: 13,
      reason: 'Image not availble',
      description: ''
    }).end(function (err, res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.equals(400);
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body.error).to.equals('Description field cannot be empty');

      _chai.assert.isObject(res.body, 'Response is not an object');

      _chai.assert.strictEqual(res.statusCode, 400, 'Status code is not 400');

      _chai.assert.strictEqual(res.body.status, 400, 'Status is not 400');

      _chai.assert.strictEqual(res.body.error, 'Description field cannot be empty');

      _chai.assert.isNull(err, 'Expect error to not exist');

      done();
    });
  });
});