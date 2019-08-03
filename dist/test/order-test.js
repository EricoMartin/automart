"use strict";

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

/* eslint-disable */
_chai["default"].use(_chaiHttp["default"]);

var token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc19hZG1pbiI6ZmFsc2UsImZpcnN0X25hbWUiOiJEb24iLCJpYXQiOjE1NjM5OTY1MDAsImV4cCI6MTU2NDYwMTMwMH0.SMCMg903d1SDuxRTYBhTWL4KPdxap__UaLUPtisOp3g';
describe('Orders Test', function () {
  var newOrder = {
    car_id: 30,
    buyer_id: 2,
    owner_id: 1,
    email: 'jason@gmail.com',
    manufacturer: 'Honda',
    model: 'Accord',
    price: 5000000,
    price_offered: 4500000
  };
  describe('POST /api/v1/order', function () {
    it('should not make a purchase order when one or all the fields are not provided', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/order/').set('Authorization', token).send({}).end(function (err, res) {
        (0, _chai.expect)(res.status).to.be.eql(400);
        (0, _chai.expect)(res.type).to.be.equal('application/json');
        (0, _chai.expect)(res.body).to.be.an('object');
        done();
      });
    });
    it('should not make a purchase order if wrong id values are sent', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/order/').set('Authorization', token).send({
        car_id: 33,
        price: 1200000
      }).end(function (err, res) {
        (0, _chai.expect)(res.status).to.be.eql(400);
        (0, _chai.expect)(res.type).to.be.equal('application/json');
        (0, _chai.expect)(res.body).to.be.an('object');
        done();
      });
    });
  });
});
describe('PATCH /api/v1/order/:order_id/price', function () {
  var update = {
    price: 1200000.001,
    user_id: 2,
    status: 'pending'
  };
  it('should update the price of a purchase order', function (done) {
    _chai["default"].request(_app["default"]).patch('/api/v1/order/2/price').set('Authorization', token).send(update).end(function (err, res) {
      (0, _chai.expect)(res.status).to.be.eql(200);
      (0, _chai.expect)(res.type).to.be.equal('application/json');
      (0, _chai.expect)(res.body).to.be.an('object');
      done();
    });
  });
  it('should not update the order price if the status is accepted or rejected', function (done) {
    _chai["default"].request(_app["default"]).patch('/api/v1/order/5/price').set('Authorization', token).send(update).end(function (err, res) {
      (0, _chai.expect)(res.status).to.be.eql(404);
      (0, _chai.expect)(res.type).to.be.equal('application/json');
      (0, _chai.expect)(res.body).to.be.an('object');
    });

    done();
  });
  it('should not update price if the new price is not a float', function (done) {
    _chai["default"].request(_app["default"]).patch('/api/v1/order/3/price').set('Authorization', token).send({
      price: '1222kl'
    }).end(function (err, res) {
      (0, _chai.expect)(res.status).to.be.eql(400);
      (0, _chai.expect)(res.type).to.be.equal('application/json');
      (0, _chai.expect)(res.body).to.be.an('object');
      done();
    });
  });
});
'';