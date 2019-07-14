"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _car = _interopRequireDefault(require("../models/car"));

var _cars = _interopRequireDefault(require("./mock_db/cars"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var expect = _chai["default"].expect;
describe('car Endpoint', function () {
  describe('Create a car ad', function () {
    it('should create a car sale ad', function () {
      var newCar = _car["default"].newCarAd({
        owner_id: 1,
        manufacturer: 'Honda',
        model: 'Accord',
        price: 5000000,
        state: 'New',
        body_type: 'saloon',
        year: '2009',
        status: 'available'
      });

      expect(newCar).to.be.a('object');
      expect(newCar).to.have.property('id');
      expect(newCar).to.have.property('owner_id');
      expect(newCar).to.have.property('created_on');
      expect(newCar).to.have.property('manufacturer');
      expect(newCar).to.have.property('model');
      expect(newCar).to.have.property('price');
      expect(newCar).to.have.property('state');
      expect(newCar).to.have.property('body_type');
      expect(newCar).to.have.property('status');
    });
  });
  describe('Find a car ad', function () {
    it('should return a car ad', function () {
      _car["default"].cars = _cars["default"];
      var id = _cars["default"][0].id;

      var res = _car["default"].findCarAd(id);

      expect(res).to.be.an('object');
    });
    it('should return an empty array if not found', function () {
      _car["default"].cars = _cars["default"];

      var res = _car["default"].findCarAd('0000000000787888888888');

      expect(res).to.be.an('array');
    });
  });
  describe('Get all ads', function () {
    it('should return all ads', function () {
      _car["default"].cars = _cars["default"];

      var cars = _car["default"].getAllCars();

      expect(cars).to.be.an('array');
      expect(cars[0]).to.have.property('id');
    });
    it('should return an empty array if there are no ads', function () {
      var cars = _car["default"].getAllCars();

      expect(cars).to.be.an('array');
    });
  });
  describe('Get all unsold cars', function () {
    it('should return all usold cars', function () {
      _car["default"].cars = _cars["default"];

      var cars = _car["default"].getAllUnsoldCars();

      expect(cars).to.be.an('array');
      expect(cars[0]).to.have.property('status');
    });
  });
  describe('Get unsold cars by manufacturer', function () {
    it('should return unsold cars by manufacturer', function () {
      _car["default"].cars = _cars["default"];
      var manufacturer = _cars["default"][0].manufacturer;

      var res = _car["default"].getUnsoldCarByProp('manufacturer', manufacturer);

      expect(res).to.be.an('array');
    });
  });
  describe('Get unsold cars by body_type', function () {
    it('should return unsold cars by body_type', function () {
      _car["default"].cars = _cars["default"]; // eslint-disable-next-line camelcase

      var body_type = _cars["default"][0].body_type;

      var res = _car["default"].getUnsoldCarByProp('body_type', body_type);

      expect(res).to.be.an('array');
    });
  });
  describe('Get unsold cars by State', function () {
    it('should return unsold cars by state', function () {
      _car["default"].cars = _cars["default"];
      var state = _cars["default"][0].state;

      var res = _car["default"].getUnsoldCarByProp('state', state);

      expect(res).to.be.an('array');
    });
  });
  describe('Update car ad', function () {
    it('should return updated car ad', function () {
      _car["default"].cars = _cars["default"];
      var status = _cars["default"][1].status;

      var res = _car["default"].updateStatus(2, 'sold');

      expect(res).to.be.a('object');
      expect(res.status).to.equal('sold');
    });
  });
  describe('get all unsold cars withn a price range', function () {
    it('should return all car ads within a price range', function () {
      _car["default"].cars = _cars["default"];
      var max = 10000000;
      var min = 3500000;

      var res = _car["default"].getCarPriceRange(min, max);

      expect(res).to.be.an('array');
    });
  });
  describe('Delete a car ad', function () {
    it('should delete car ad', function () {
      _car["default"].cars = _cars["default"];
      var id = _cars["default"][3].id;

      var res = _car["default"].deleteCar(id);

      expect(res).to.be.an('array');
    });
  });
});