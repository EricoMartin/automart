"use strict";

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

var _dummyDb = require("./dummy-db");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

_chai["default"].use(_chaiHttp["default"]);

describe('Test for create order endpoint', function () {
  it('Test Should create an order', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/order').set({
      'Content-Type': 'application/json'
    }).send(_dummyDb.carDetail[0]).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(201);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.equal(201);
      (0, _chai.expect)(res.body.data).to.be.an('object');
      (0, _chai.expect)(res.body.data.id).to.be.a('number');
      (0, _chai.expect)(res.body.data.car_id).to.be.a('number');
      (0, _chai.expect)(res.body.data.created_on).to.be.a('string');
      (0, _chai.expect)(res.body.data.status).to.be.a('string');
      (0, _chai.expect)(res.body.data.price).to.be.a('number');
      (0, _chai.expect)(res.body.data.priceOffered).to.be.a('number');

      _chai.assert.strictEqual(res.statusCode, 201, 'Status code is not 201');

      _chai.assert.strictEqual(res.body.status, 201, 'Status is not 201');

      _chai.assert.isObject(res.body, 'Response is not an object');

      _chai.assert.isObject(res.body.data, 'Data is not an object');

      _chai.assert.isNumber(res.body.data.id, 'ID is not a number');

      _chai.assert.isNumber(res.body.data.car_id, 'ID is not a number');

      _chai.assert.isString(res.body.data.created_on, 'Date is not a string');

      _chai.assert.isString(res.body.data.status, 'Status is not a string');

      _chai.assert.isNumber(res.body.data.price, 'Price is not a number');

      _chai.assert.isNumber(res.body.data.priceOffered, 'Price is not a number');

      _chai.assert.isNull(err, 'unexpected error');

      done();
    });
  });
  it('Test Should return an error message if price is not a number', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/order').set({
      'Content-Type': 'application/json'
    }).send(_dummyDb.noCarDetail[0]).end(function (err, res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.equals(400);
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body.error).to.equals('Enter a valid price');

      _chai.assert.isObject(res.body, 'Response is not an object');

      _chai.assert.strictEqual(res.statusCode, 400, 'Status code is not 400');

      _chai.assert.strictEqual(res.body.status, 400, 'Status is not 400');

      _chai.assert.strictEqual(res.body.error, 'Enter a valid price', 'Expect error to be Enter a valid price');

      _chai.assert.isNull(err, 'unexpected error');

      done();
    });
  });
  it('Test Should return an error if request is not authorized', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/order').set({
      'Content-Type': 'application/json'
    }).send(_dummyDb.carDetail[0]).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(401);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.equal(401);
      (0, _chai.expect)(res.body.error).to.equal('Authentication failed! Please Login again');

      _chai.assert.isObject(res.body, 'Response is not an object');

      _chai.assert.strictEqual(res.statusCode, 401, 'Status code is not 401');

      _chai.assert.strictEqual(res.body.status, 401, 'Status is not 401');

      _chai.assert.strictEqual(res.body.error, 'Authentication failed! Please Login again', 'Expect error to be Authentication failed! Please Login again');

      _chai.assert.isNull(err, 'unexpected error');

      done();
    });
  });
  it('Test should return an error if token is not valid', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/order').set({
      'Content-Type': 'application/json'
    }).send(_dummyDb.carDetail[0]).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(401);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.equal(401);
      (0, _chai.expect)(res.body.error).to.equal('Authentication failed! Please Login again');

      _chai.assert.isObject(res.body, 'Response is not an object');

      _chai.assert.strictEqual(res.statusCode, 401, 'Status code is not 401');

      _chai.assert.strictEqual(res.body.status, 401, 'Status is not 401');

      _chai.assert.strictEqual(res.body.error, 'Authentication failed! Please Login again', 'Expect error to be Authentication failed! Please Login again');

      _chai.assert.isNull(err, 'unexpected error');

      done();
    });
  });
});
describe('Test for update order price', function () {
  // Create an order
  var order;
  before(function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/order').set({
      'Content-Type': 'application/json'
    }).send(_dummyDb.carDetail[0]).end(function (err, res) {
      order = res.body.data;
      done();
    });
  });
  it('Test should update price of purchase order', function (done) {
    _chai["default"].request(_app["default"]).patch("/api/v1/order/".concat(_dummyDb.carOrder.id, "/price")).set({
      'Content-Type': 'application/json'
    }).send(_dummyDb.carDetail[0]).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(200);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.be.equal(200);
      (0, _chai.expect)(res.body.data.id).to.be.a('number');
      (0, _chai.expect)(res.body.data.car_id).to.be.a('number');
      (0, _chai.expect)(res.body.data.status).to.be.a('string');
      (0, _chai.expect)(res.body.data.old_price_offered).to.be.a('number');
      (0, _chai.expect)(res.body.data.new_price_offered).to.be.a('number');

      _chai.assert.strictEqual(res.statusCode, 200, 'Status code is not 200');

      _chai.assert.strictEqual(res.body.status, 200, 'Status is not 200');

      _chai.assert.isObject(res.body, 'Response is not an object');

      _chai.assert.isObject(res.body.data, 'Data is not an object');

      _chai.assert.isNumber(res.body.data.id, 'ID is not a number');

      _chai.assert.isNumber(res.body.data.car_id, 'ID is not a number');

      _chai.assert.isNumber(res.body.data.old_price_offered, 'Price is not a number');

      _chai.assert.isNumber(res.body.data.new_price_offered, 'Price is not a number');

      _chai.assert.isString(res.body.data.status, 'Status is not a string');

      _chai.assert.isNull(err, 'unexpected error');

      done();
    });
  });
  it('Test should return a message if no order with the id is found', function (done) {
    _chai["default"].request(_app["default"]).patch('/api/v1/order/1234354/price').set({
      'Content-Type': 'application/json'
    }).send(_dummyDb.carDetail[0]).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(200);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.data).to.be.equal('No record found');
      (0, _chai.expect)(res.body.data).to.be.a('string');

      _chai.assert.isObject(res.body, 'Response is not an object');

      _chai.assert.strictEqual(res.statusCode, 200, 'Status code is not 200');

      _chai.assert.isString(res.body.data, 'Data is not a string');

      _chai.assert.strictEqual(res.body.data, 'No record found', 'Data is not equal to No record found');

      _chai.assert.isNull(err, 'unexpected error');

      done();
    });
  });
  it('Test should return an error message if id is not a number', function (done) {
    _chai["default"].request(_app["default"]).patch('/api/v1/order/1234354/price').set({
      'Content-Type': 'application/json'
    }).send(_dummyDb.carDetail[0]).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.error).to.be.equal('Invalid ID');

      _chai.assert.isObject(res.body, 'Response is not an object');

      _chai.assert.strictEqual(res.statusCode, 400, 'Status code is not 200');

      _chai.assert.isString(res.body.error, 'ID is not valid');

      _chai.assert.strictEqual(res.body.error, 'ID is not valid', 'Expected error to be a valid ID');

      _chai.assert.isNull(err, 'unexpected error');

      done();
    });
  });
  it('Test should return an error message if price is not a number', function (done) {
    _chai["default"].request(_app["default"]).patch("/api/v1/order/".concat(_dummyDb.carDetail.id, "/price")).set({
      'Content-Type': 'application/json'
    }).send(_dummyDb.carDetail[0]).end(function (err, res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.equals(400);
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body.error).to.equals('Enter a valid price');

      _chai.assert.isObject(res.body, 'Response is not an object');

      _chai.assert.strictEqual(res.statusCode, 400, 'Status code is not 400');

      _chai.assert.strictEqual(res.body.status, 400, 'Status is not 400');

      _chai.assert.strictEqual(res.body.error, 'Enter a valid price', 'Expected error to be a valid price');

      _chai.assert.isNull(err, 'unexpected error');

      done();
    });
  });
  it('Test should return an error if request is not authorized', function (done) {
    _chai["default"].request(_app["default"]).patch("/api/v1/order/".concat(_dummyDb.carOrder.id, "/price")).set({
      'Content-Type': 'application/json'
    }).send(_dummyDb.carDetail[0]).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(401);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.equal(401);
      (0, _chai.expect)(res.body.error).to.equal('Authentication failed! Please Login again');

      _chai.assert.isObject(res.body, 'Response is not an object');

      _chai.assert.strictEqual(res.statusCode, 401, 'Status code is not 401');

      _chai.assert.strictEqual(res.body.status, 401, 'Status is not 401');

      _chai.assert.strictEqual(res.body.error, 'Authentication failed! Please Login again', 'Expect error to be Authentication failed! Please Login again');

      _chai.assert.isNull(err, 'unexpected error');

      done();
    });
  });
  it('Test should return an error if token is not valid', function (done) {
    _chai["default"].request(_app["default"]).patch("/api/v1/order/".concat(_dummyDb.carOrder.id, "/price")).set({
      'Content-Type': 'application/json'
    }).send(_dummyDb.carDetail[2]).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(401);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.equal(401);
      (0, _chai.expect)(res.body.error).to.equal('Authentication failed! Please Login again');

      _chai.assert.isObject(res.body, 'Response is not an object');

      _chai.assert.strictEqual(res.statusCode, 401, 'Status code is not 401');

      _chai.assert.strictEqual(res.body.status, 401, 'Status is not 401');

      _chai.assert.strictEqual(res.body.error, 'Authentication failed! Please Login again', 'Expect error to be Authentication failed! Please Login again');

      _chai.assert.isNull(err, 'unexpected error');

      done();
    });
  });
});