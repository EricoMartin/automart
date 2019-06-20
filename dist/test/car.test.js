"use strict";

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

var _dummyDb = require("./dummy-db");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

_chai["default"].use(_chaiHttp["default"]);

describe('Create a car AD', function () {
  it('should create a new car with all details', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/car').set({
      'Content-type': 'application/json'
    }).send(_dummyDb.carDetail).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(201);
      (0, _chai.expect)(res.body.status).to.equal(201);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.data).to.be.an('object');
      (0, _chai.expect)(res.body.data).to.have.property('object');

      _chai.assert.strictEqual(res.statusCode, 201, 'Status code is not 201');

      _chai.assert.strictEqual(res.body.status, 201, 'Status is not 201');

      _chai.assert.isNumber(res.body.data.id, 'id', 'enter the car id');

      _chai.assert.isNumber(res.body.data.owner, 'owner', 'enter the owner id');

      _chai.assert.property(res.body.data.createdOn, 'createdOn', 'enter date of post ad');

      _chai.assert.isString(res.body.data.make, 'make', 'enter make of car');

      _chai.assert.isString(res.body.data.model, 'model', 'enter model of car');

      _chai.assert.isNumber(res.body.data.price, 'price', 'enter price of car');

      _chai.assert.isString(res.body.data.status, 'status', 'enter status of car');

      _chai.assert.isString(res.body.data.bodytype, 'bodytype', 'enter bodytype of car');

      _chai.assert.isNumber(res.body.data.year, 'year', 'enter the year of car');
    });
  }), it('should return an error if make is not provided', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1//car').send(_dummyDb.testMakeDetail[2]).set({
      'Content-type': 'application/json'
    }).end(function (err, res) {
      (0, _chai.expect)(res.body).have.status(400);
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body.status).to.equal(300);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.data).to.be.an('object');
      (0, _chai.expect)(res.body.data.make).to.be.a('string');
      (0, _chai.expect)(res.body.error).to.be.an('object');

      _chai.assert.isObject(res.body, 'Response is not an object');

      _chai.assert.strictEqual(res.statusCode, 400, 'Status code is not 400');

      _chai.assert.strictEqual(res.body.status, 400, 'Status is not 400');

      _chai.assert.strictEqual(res.body.error, 'Make should not be empty', 'Expect error to be Make should not be empty');

      _chai.assert.isNotNull(err, 'unexpected error');

      done();
    });
  }), it('should return an error if model is not provided', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/car').send(_dummyDb.testMakeDetail[2]).set({
      'Content-type': 'application/json'
    }).end(function (err, res) {
      (0, _chai.expect)(res.body).have.status(400);
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body.status).to.equal(300);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.data).to.be.an('object');
      (0, _chai.expect)(res.body.data.make).to.be.a('string');
      (0, _chai.expect)(res.body.error).to.be.an('object');

      _chai.assert.isObject(res.body, 'Response is not an object');

      _chai.assert.strictEqual(res.statusCode, 400, 'Status code is not 400');

      _chai.assert.strictEqual(res.body.status, 400, 'Status is not 400');

      _chai.assert.strictEqual(res.body.error, 'Model should not be empty', 'Expect error to be model should not be empty');

      _chai.assert.isNotNull(err, 'unexpected error');

      done();
    });
  }), it('should return an error if incorrect car status is provided', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/car').send(_dummyDb.testMakeDetail[0]).set({
      'Content-type': 'application/json'
    }).end(function (err, res) {
      (0, _chai.expect)(res.body).have.status(400);
      (0, _chai.expect)(res.body).to.be.a('object');
      (0, _chai.expect)(res.body).to.have.property('status');
      (0, _chai.expect)(res.body).to.have.property('error');
      (0, _chai.expect)(res.body.status).to.equal(400);
      (0, _chai.expect)(res.body.error).to.be.a('object');
      (0, _chai.expect)(res.body.error).to.have.property('status');
      (0, _chai.expect)(res.body.error.state).to.equal('The valid options are either New, new, NEW or Old, old, OLD');
      done();
    });
  }), it('should return an error if incorrect bodytpe is provided', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/car').send(_dummyDb.testMakeDetail[1]).set({
      'Content-type': 'application/json'
    }).end(function (err, res) {
      (0, _chai.expect)(res.body).have.status(400);
      (0, _chai.expect)(res.body).to.be.a('object');
      (0, _chai.expect)(res.body).to.have.property('status');
      (0, _chai.expect)(res.body).to.have.property('error');
      (0, _chai.expect)(res.body.status).to.equal(400);
      (0, _chai.expect)(res.body.error).to.be.a('object');
      (0, _chai.expect)(res.body.error).to.have.property('bodytype');
      (0, _chai.expect)(res.body.error.bodytype).to.equal('The valid options are saloon, wagon and suv');
      done();
    });
  });
  describe('Get a car', function () {
    it('should get an available car present in db', function (done) {
      _chai["default"].request(_app["default"]).get('/api/v1/car').set({
        'Content-type': 'application/json'
      }).end(function (err, res) {
        (0, _chai.expect)(res.statusCode).to.equal(200);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body.status).to.equal(200);
        (0, _chai.expect)(res.body.data).to.be.an('object');
        (0, _chai.expect)(res.body).to.have.property('status');
        (0, _chai.expect)(res.body.data).to.be.a('object');
        (0, _chai.expect)(res.body.data).to.have.property('id');
        (0, _chai.expect)(res.body.data).to.have.property('owner');
        (0, _chai.expect)(res.body.data).to.have.property('createdOn');
        (0, _chai.expect)(res.body.data).to.have.property('make');
        (0, _chai.expect)(res.body.data).to.have.property('model');
        (0, _chai.expect)(res.body.data).to.have.property('price');
        (0, _chai.expect)(res.body.data).to.have.property('state');
        (0, _chai.expect)(res.body.data).to.have.property('bodyType');
        (0, _chai.expect)(res.body.data).to.have.property('year');
        done();
      });
    });
    it('should return an error if the car is not in the db', function (done) {
      _chai["default"].request(_app["default"]).get('/api/v1/car').set({
        'Content-type': 'application/json'
      }).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(404);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body.status).to.be.an('object');
        (0, _chai.expect)(res.body).to.have.property('status');
        (0, _chai.expect)(res.body).to.have.property('error');
        (0, _chai.expect)(res.body.status).to.equal(404);
        (0, _chai.expect)(res.body.error).to.equal("The requested car is not available");
        done();
      });
    });
    it('should return an error if the ID is not a number', function (done) {
      _chai["default"].request(_app["default"]).get('/api/v1/car').set({
        'Content-type': 'application/json'
      }).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(400);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body.status).to.be.an('object');
        (0, _chai.expect)(res.body).to.have.property('status');
        (0, _chai.expect)(res.body).to.have.property('error');
        (0, _chai.expect)(res.body.status).to.equal(400);
        (0, _chai.expect)(res.body.error).to.equal('The ID must contain numbers');
        done();
      });
    });
  });
  describe('Get all cars', function () {
    it('should get all the cars in the db', function (done) {
      _chai["default"].request(_app["default"]).get('/api/v1/car').set({
        'Content-type': 'application/json'
      }).end(function (err, res) {
        (0, _chai.expect)(res.statusCode).to.equal(200);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body.status).to.equal(200);
        (0, _chai.expect)(res.body).to.have.property('status');
        (0, _chai.expect)(res.body).to.have.property('data');
        (0, _chai.expect)(res.body.data).to.be.an('array');
        (0, _chai.expect)(res.body.data[0]).to.be.an('object');
        done();
      });
    });
  });
  it('should display an error 404 message if car is not available', function (done) {
    _chai["default"].request(_app["default"])["delete"]('/api/v1/car/190').end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(404);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body).to.have.property('status');
      (0, _chai.expect)(res.body).to.have.property('error');
      (0, _chai.expect)(res.body.status).to.equal(404);
      (0, _chai.expect)(res.body.error).to.be.equal('The requested car is not available');
      done();
    });
  });
  it('Should return an error message if price is not a number', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/car').set({
      'Content-Type': 'multipart/form-data'
    }).end(function (err, res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.equals(400);
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body.error).to.equals('Enter a valid price');

      _chai.assert.isObject(res.body, 'Response is not an object');

      _chai.assert.strictEqual(res.statusCode, 400, 'Status code is not 400');

      _chai.assert.strictEqual(res.body.status, 400, 'Status is not 400');

      _chai.assert.strictEqual(res.body.error, 'Enter a valid price');

      _chai.assert.isNull(err, 'Unexpected error');

      done();
    });
  });
  it('Should update car AD price', function (done) {
    _chai["default"].request(_app["default"]).patch('/api/v1/car/carDetail/price').set({
      'Content-Type': 'application/json'
    }).send(_dummyDb.updatePrice[0]).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(200);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.be.equal(200);
      (0, _chai.expect)(res.body.data).to.be.an('object');
      (0, _chai.expect)(res.body.data.id).to.be.a('number');
      (0, _chai.expect)(res.body.data.created_on).to.be.a('string');
      (0, _chai.expect)(res.body.data.email).to.be.a('string');
      (0, _chai.expect)(res.body.data.make).to.be.a('string');
      (0, _chai.expect)(res.body.data.model).to.be.a('string');
      (0, _chai.expect)(res.body.data.price).to.be.a('number');
      (0, _chai.expect)(res.body.data.state).to.be.a('string');
      (0, _chai.expect)(res.body.data.status).to.equal('available');
      (0, _chai.expect)(res.body.data.year).to.be.a('number');

      _chai.assert.strictEqual(res.statusCode, 200, 'Status code is not 200');

      _chai.assert.strictEqual(res.body.status, 200, 'Status is not 200');

      _chai.assert.isObject(res.body, 'Response is not an object');

      _chai.assert.isObject(res.body.data, 'Data is not an object');

      _chai.assert.isNumber(res.body.data.id, 'ID is not a number');

      _chai.assert.isString(res.body.data.created_on, 'Date is not a string');

      _chai.assert.isString(res.body.data.manufacturer, 'Manufacturer is not a string');

      _chai.assert.isString(res.body.data.model, 'Model is not a string');

      _chai.assert.strictEqual(res.body.data.status, 'available', 'Status is not available');

      _chai.assert.isNumber(res.body.data.price, 'Price is not a number');

      _chai.assert.isString(res.body.data.state, 'State is not a string');

      _chai.assert.isNumber(res.body.data.year, 'Year is not a number');

      _chai.assert.isNull(err, 'Unexpected error');

      done();
    });
  });
  it('Should return all unsold cars of a specific manufacturer', function (done) {
    _chai["default"].request(_app["default"]).get('/api/v1/car').query({
      status: 'available',
      manufacturer: 'Toyota'
    }).set({
      'Content-Type': 'application/json'
    }).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(200);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.data).to.be.an('array');

      _chai.assert.strictEqual(res.statusCode, 200, 'Status code is not 200');

      _chai.assert.isObject(res.body, 'Response is not an object');

      _chai.assert.isArray(res.body.data, 'Data is not array');

      _chai.assert.isNull(err, 'unexpected error');

      done();
    });
  });
  it('Should delete an AD if user is an admin', function (done) {
    _chai["default"].request(_app["default"])["delete"]("/api/v1/car/".concat(carAd.id)).set({
      'Content-Type': 'application/json'
    }).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(200);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.data).to.be.equal('Car Ad successfully deleted');
      (0, _chai.expect)(res.body.data).to.be.a('string');

      _chai.assert.isObject(res.body, 'Response is not an object');

      _chai.assert.strictEqual(res.statusCode, 200, 'Status code is not 200');

      _chai.assert.isString(res.body.data, 'Data is not a string');

      _chai.assert.strictEqual(res.body.data, 'Car Ad successfully deleted', 'Data is not equal to Car Ad successfully deleted');

      _chai.assert.isNull(err, 'Expect error to not exist');

      done();
    });
  });
  it('Should return a message if record is not found', function (done) {
    _chai["default"].request(_app["default"])["delete"]('/api/v1/car/11111045').set({
      'Content-Type': 'application/json'
    }).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(200);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.data).to.be.equal('No record found');
      (0, _chai.expect)(res.body.data).to.be.a('string');

      _chai.assert.isObject(res.body, 'Response is not an object');

      _chai.assert.strictEqual(res.statusCode, 200);

      _chai.assert.isString(res.body.data, 'Data is not a string');

      _chai.assert.strictEqual(res.body.data, 'No record found', 'Data is not available');

      _chai.assert.isNull(err, 'Unexpected error');

      done();
    });
  });
  it('Should return an error if user is not an admin', function (done) {
    _chai["default"].request(_app["default"])["delete"]("/api/v1/car/".concat(carAd.id)).set({
      'Content-Type': 'application/json'
    }).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(403);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.error).to.be.equal('Forbidden: Only Admin can delete an AD');
      (0, _chai.expect)(res.body.error).to.be.a('string');

      _chai.assert.isObject(res.body, 'Response is not an object');

      _chai.assert.strictEqual(res.statusCode, 403);

      _chai.assert.isString(res.body.error, 'Data is not a string');

      _chai.assert.strictEqual(res.body.error, 'Forbidden: Only Admin user can delete an AD', 'Only Admin user can delete an AD');

      _chai.assert.isNull(err, 'Unexpected error');

      done();
    });
  });
});
describe('DELETE a car', function () {
  it('should remove a car and display a success message', function (done) {
    _chai["default"].request(_app["default"])["delete"]('/api/v1/car3').end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(200);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body).to.have.property('status');
      (0, _chai.expect)(res.body).to.have.property('data');
      (0, _chai.expect)(res.body.status).to.equal(200);
      (0, _chai.expect)(res.body.data).to.be.a('object');
      (0, _chai.expect)(res.body.data).to.have.property('message');
      (0, _chai.expect)(res.body.data).to.have.property('car');
      (0, _chai.expect)(res.body.data.message).to.equal('Car Ad has been deleted succesfully');
      (0, _chai.expect)(res.body.data).to.have.property('id');
      (0, _chai.expect)(res.body.data).to.have.property('owner');
      (0, _chai.expect)(res.body.data).to.have.property('createdOn');
      (0, _chai.expect)(res.body.data).to.have.property('make');
      (0, _chai.expect)(res.body.data).to.have.property('model');
      (0, _chai.expect)(res.body.data).to.have.property('price');
      (0, _chai.expect)(res.body.data).to.have.property('state');
      (0, _chai.expect)(res.body.data).to.have.property('bodyType');
      (0, _chai.expect)(res.body.data).to.have.property('year');
      done();
    });
  });
});