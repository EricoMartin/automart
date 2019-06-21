"use strict";

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

var _dummyDb = require("./dummy-db");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_chai["default"].use(_chaiHttp["default"]);

describe('Test a car AD endpoint', function () {
  var carAd;
  before(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var prom, response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            prom = new Promise(function (resolve) {
              var res = _chai["default"].request(_app["default"]).post('/api/v1/car').set({
                'Content-type': 'application/json'
              }).send(_dummyDb.carDetail);
            }).then(function (res) {
              return res;
            })["catch"](function (err) {
              throw err;
            });
            _context.next = 3;
            return prom;

          case 3:
            response = _context.sent;
            carAd = response.body.data;

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  it('should return an error if Manufacturer is not provided', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1//car').send(_dummyDb.testManufacturerDetail[2]).set({
      'Content-type': 'application/json'
    }).end(function (err, res) {
      (0, _chai.expect)(res.body).have.status(400);
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body.status).to.equal(300);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.data).to.be.an('object');
      (0, _chai.expect)(res.body.data.Manufacturer).to.be.a('string');
      (0, _chai.expect)(res.body.error).to.be.an('object');

      _chai.assert.isObject(res.body, 'Response is not an object');

      _chai.assert.strictEqual(res.statusCode, 400, 'Status code is not 400');

      _chai.assert.strictEqual(res.body.status, 400, 'Status is not 400');

      _chai.assert.strictEqual(res.body.error, 'Manufacturer should not be empty', 'Expect error to be Manufacturer should not be empty');

      _chai.assert.isNotNull(err, 'unexpected error');

      done();
    });
  }), it('Should return an error message if manufacturer field contains a number', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/car').send(_dummyDb.testManufacturerDetail[0]).end(function (err, res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.equals(400);
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body.error).to.equals('Manufacturer field cannot contain number(s)');

      _chai.assert.isObject(res.body, 'Response is not an object');

      _chai.assert.strictEqual(res.statusCode, 400, 'Status code is not 400');

      _chai.assert.strictEqual(res.body.status, 400, 'Status is not 400');

      _chai.assert.strictEqual(res.body.error, 'Manufacturer field cannot contain number(s)', 'Manufacturer field cannot contain number(s)');

      _chai.assert.isNull(err, 'Expect error to not exist');

      done();
    });
  });
  it('should return an error if model is not provided', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/car').set({
      'Content-type': 'application/json'
    }).send(_dummyDb.testManufacturerDetail[3]).end(function (err, res) {
      (0, _chai.expect)(res.body).have.status(400);
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body.status).to.equal(300);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.data).to.be.an('object');
      (0, _chai.expect)(res.body.data.Manufacturer).to.be.a('string');
      (0, _chai.expect)(res.body.error).to.be.an('object');

      _chai.assert.isObject(res.body, 'Response is not an object');

      _chai.assert.strictEqual(res.statusCode, 400, 'Status code is not 400');

      _chai.assert.strictEqual(res.body.status, 400, 'Status is not 400');

      _chai.assert.strictEqual(res.body.error, 'Model should not be empty', 'Expect error to be model should not be empty');

      _chai.assert.isNotNull(err, 'unexpected error');

      done();
    });
  }), it('should return an error if incorrect car status is provided', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/car').set({
      'Content-type': 'application/json'
    }).send(_dummyDb.testManufacturerDetail[5]).end(function (err, res) {
      (0, _chai.expect)(res.body).have.status(400);
      (0, _chai.expect)(res.body).to.be.a('object');
      (0, _chai.expect)(res.body).to.have.property('status');
      (0, _chai.expect)(res.body).to.have.property('error');
      (0, _chai.expect)(res.body.status).to.equal(400);
      (0, _chai.expect)(res.body.error).to.be.a('object');
      (0, _chai.expect)(res.body.error).to.have.property('status');
      (0, _chai.expect)(res.body.error.state).to.equal('The valid options are either Available, SOld or Pending');

      _chai.assert.isNull(err, 'unexpected error');

      done();
    });
  }), it('should return an error if incorrect bodytpe is provided', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/car').set({
      'Content-type': 'application/json'
    }).send(_dummyDb.testManufacturerDetail[5]).end(function (err, res) {
      (0, _chai.expect)(res.body).have.status(400);
      (0, _chai.expect)(res.body).to.be.a('object');
      (0, _chai.expect)(res.body).to.have.property('status');
      (0, _chai.expect)(res.body).to.have.property('error');
      (0, _chai.expect)(res.body.status).to.equal(400);
      (0, _chai.expect)(res.body.error).to.be.a('object');
      (0, _chai.expect)(res.body.error).to.have.property('bodyType');
      (0, _chai.expect)(res.body.error.bodytype).to.equal('The valid options are saloon, wagon and suv');

      _chai.assert.isNull(err, 'unexpected error');

      done();
    });
  });
  it('Should return an error message if car state is empty', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/car').set({
      'Content-Type': 'multipart/form-data'
    }).send(_dummyDb.testManufacturerDetail[1]).end(function (err, res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.equals(400);
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body.error).to.equals('Car state cannot be empty');

      _chai.assert.isObject(res.body, 'Response is not an object');

      _chai.assert.strictEqual(res.statusCode, 400, 'Status code is not 400');

      _chai.assert.strictEqual(res.body.status, 400, 'Status is not 400');

      _chai.assert.strictEqual(res.body.error, 'State cannot be empty');

      _chai.assert.isNull(err, 'Expect error to not exist');

      done();
    });
  });
  it('Should return an error message if car state contains a number', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/car').set({
      'Content-Type': 'multipart/form-data'
    }).send(_dummyDb.testManufacturerDetail[2]).end(function (err, res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.equals(400);
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body.error).to.equals('Car state field cannot contain number(s)');

      _chai.assert.isObject(res.body, 'Response is not an object');

      _chai.assert.strictEqual(res.statusCode, 400, 'Status code is not 400');

      _chai.assert.strictEqual(res.body.status, 400, 'Status is not 400');

      _chai.assert.strictEqual(res.body.error, 'Car state field cannot contain number(s)');

      _chai.assert.isNull(err, 'Expect error to not exist');

      done();
    });
  });
  it('Should return an error message if year is empty', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/car').set({
      'Content-Type': 'multipart/form-data'
    }).send(_dummyDb.testManufacturerDetail[1]).end(function (err, res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.equals(400);
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body.error).to.equals('Enter a valid year');

      _chai.assert.isObject(res.body, 'Response is not an object');

      _chai.assert.strictEqual(res.statusCode, 400, 'Status code is not 400');

      _chai.assert.strictEqual(res.body.status, 400, 'Status is not 400');

      _chai.assert.strictEqual(res.body.error, 'Enter a valid year');

      _chai.assert.isNull(err, 'Expect error to not exist');

      done();
    });
  });
  it('Should return an error message if year is more or less than 4 digits', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/car').set({
      'Content-Type': 'multipart/form-data'
    }).send(_dummyDb.testManufacturerDetail[2]).end(function (err, res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.equals(400);
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body.error).to.equals('Input a valid year');

      _chai.assert.isObject(res.body, 'Response is not an object');

      _chai.assert.strictEqual(res.statusCode, 400, 'Status code is not 400');

      _chai.assert.strictEqual(res.body.status, 400, 'Status is not 400');

      _chai.assert.strictEqual(res.body.error, 'Input a valid year');

      _chai.assert.isNull(err, 'Expect error to not exist');

      done();
    });
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
      (0, _chai.expect)(res.body.data).to.have.property('Manufacturer');
      (0, _chai.expect)(res.body.data).to.have.property('model');
      (0, _chai.expect)(res.body.data).to.have.property('price');
      (0, _chai.expect)(res.body.data).to.have.property('state');
      (0, _chai.expect)(res.body.data).to.have.property('bodyType');
      (0, _chai.expect)(res.body.data).to.have.property('year');

      _chai.assert.isNull(err, 'unexpected error');

      done();
    });
  });
  it('should return an error if the car is not in the db', function (done) {
    _chai["default"].request(_app["default"]).get('/api/v1/car').set({
      'Content-type': 'application/json'
    }).send(_dummyDb.noCarDetail).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(404);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.be.an('object');
      (0, _chai.expect)(res.body).to.have.property('status');
      (0, _chai.expect)(res.body).to.have.property('error');
      (0, _chai.expect)(res.body.status).to.equal(404);
      (0, _chai.expect)(res.body.error).to.equal("The requested car is not available");

      _chai.assert.isNull(err, 'unexpected error');

      done();
    });
  });
  it('should return an error if the ID is not a number', function (done) {
    _chai["default"].request(_app["default"]).get('/api/v1/car').set({
      'Content-type': 'application/json'
    }).send(_dummyDb.testManufacturerDetail[2]).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(400);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.be.an('object');
      (0, _chai.expect)(res.body).to.have.property('status');
      (0, _chai.expect)(res.body).to.have.property('error');
      (0, _chai.expect)(res.body.status).to.equal(400);
      (0, _chai.expect)(res.body.error).to.equal('The ID must contain numbers');

      _chai.assert.isNull(err, 'unexpected error');

      done();
    });
  });
  it('Should return all unsold cars within a price range', function (done) {
    _chai["default"].request(_app["default"]).get('/api/v1/car').query({
      status: 'available',
      min_price: '100000',
      max_price: '1600000'
    }).set({
      'Content-type': 'application/json'
    }).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(200);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.data).to.be.an('array');

      _chai.assert.strictEqual(res.statusCode, 200, 'Status code is not 200');

      _chai.assert.isObject(res.body, 'Response is not an object');

      _chai.assert.isArray(res.body.data, 'Data is not array');

      _chai.assert.isNull(err, 'Expect error to not exist');

      done();
    });
  });
});
describe('Get all cars', function () {
  it('should get all the cars in the db', function (done) {
    _chai["default"].request(_app["default"]).get('/api/v1/car').set({
      'Content-type': 'application/json'
    }).send(_dummyDb.carDetail).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(200);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.equal(200);
      (0, _chai.expect)(res.body).to.have.property('status');
      (0, _chai.expect)(res.body).to.have.property('data');
      (0, _chai.expect)(res.body.data).to.be.an('array');
      (0, _chai.expect)(res.body.data[0]).to.be.an('object');

      _chai.assert.isNull(err, 'unexpected error');

      done();
    });
  });
  it('should display error message if car not available', function (done) {
    _chai["default"].request(_app["default"])["delete"]('/api/v1/car/190').end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(404);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body).to.have.property('status');
      (0, _chai.expect)(res.body).to.have.property('error');
      (0, _chai.expect)(res.body.status).to.equal(404);
      (0, _chai.expect)(res.body.error).to.be.equal('The requested car is not available');

      _chai.assert.isNull(err, 'unexpected error');

      done();
    });
  });
  it('Should return all unsold cars with status available', function (done) {
    _chai["default"].request(_app["default"]).get('/api/v1/car').query({
      status: 'available'
    }).set({
      'Content-Type': 'application/json'
    }).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(200);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.data).to.be.an('array');

      _chai.assert.strictEqual(res.statusCode, 200, 'Status code is not 200');

      _chai.assert.isObject(res.body, 'Response is not an object');

      _chai.assert.isArray(res.body.data, 'Data is not array');

      _chai.assert.isNull(err, 'Expect error to not exist');

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
      (0, _chai.expect)(res.body.data.Manufacturer).to.be.a('string');
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
  it('Should return a message if no AD with queried status and price is found', function (done) {
    _chai["default"].request(_app["default"]).get('/api/v1/car?status=unknown&min_price=unknown&max_price=unknown').set({
      'Content-Type': 'application/json'
    }).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(200);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.data).to.be.equal('No record found');
      (0, _chai.expect)(res.body.data).to.be.a('string');

      _chai.assert.isObject(res.body, 'Response is not an object');

      _chai.assert.strictEqual(res.statusCode, 200, 'Status code is not 200');

      _chai.assert.isString(res.body.data, 'Data is not a string');

      _chai.assert.strictEqual(res.body.data, 'No record found', 'Data is not equal to No record found');

      _chai.assert.isNull(err, 'Expect error to not exist');

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
      (0, _chai.expect)(res.body.data).to.have.property('Manufacturer');
      (0, _chai.expect)(res.body.data).to.have.property('model');
      (0, _chai.expect)(res.body.data).to.have.property('price');
      (0, _chai.expect)(res.body.data).to.have.property('state');
      (0, _chai.expect)(res.body.data).to.have.property('bodyType');
      (0, _chai.expect)(res.body.data).to.have.property('year');
      done();
    });
  });
});