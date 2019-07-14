"use strict";

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

require("regenerator-runtime");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _path = _interopRequireDefault(require("path"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _app = _interopRequireDefault(require("../app"));

var _cars = _interopRequireDefault(require("./mock_db/cars"));

var _car = _interopRequireDefault(require("../models/car"));

var _user = _interopRequireDefault(require("../models/user"));

var _users = _interopRequireDefault(require("./mock_db/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

var url = _path["default"].resolve('./');

_dotenv["default"].config();

_chai["default"].use(_chaiHttp["default"]);

var token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo0LCJmaXJzdE5hbWUiOiJJYnUgRXJpYyIsImxhc3ROYW1lIjoiTWFydGluaSIsImFkZHJlc3MiOiIxLCBhZHJlc3Mgc3RyZWV0Iiwic3RhdHVzIjoicmVnaXN0ZXJlZCIsImVtYWlsIjoibWFydGluaXJleEB5YWhvby5jby51ayIsImlzX2FkbWluIjpmYWxzZSwicGFzc3dvcmQiOiIxMTExMTExMSJ9LCJpYXQiOjE1NjMwMjkyNTQsImV4cCI6MTU2MzE1ODg1NH0.hb5yIrzbO_JgBZYzgTyRPn9yriKaVGymKB86kEXkS6s';
describe('Test car AD endpoint', function () {
  describe('Cars', function () {
    var carsArray = function carsArray() {
      _car["default"].cars = _cars["default"];
    };

    var usersArray = function usersArray() {
      _user["default"].users = _users["default"];
    };

    it('should create a new car ad', function (done) {
      usersArray();
      var user = _users["default"][0];

      _chai["default"].request(_app["default"]).post('/api/v1/car').type('form').set({
        'Content-Type': 'application/json',
        Authorization: token
      }).send(_cars["default"][0]).end(function (err, res) {
        (0, _chai.expect)(res.body.status).to.equal(201);
        (0, _chai.expect)(res.statusCode).to.equal(201);
        (0, _chai.expect)(res.body).to.be.an('object');
        done();
      });
    });
    it('should return error 400 if there is no image', function (done) {
      usersArray();
      var user = _users["default"][1];
      user.isAdmin = false;
      /*const data = {
        id: usersData[1].id,
        status: 'available',
        price: 2500000,
        state: 'new',
        model: 'es6 v',
        manufacturer: 'BMW',
        body_type: ' ',
      };
      */

      _chai["default"].request(_app["default"]).post('/api/v1/car').set({
        Authorization: token
      }).send(_cars["default"][2]).end(function (err, res) {
        (0, _chai.expect)(res.body.message).to.equal('Fill all required fields');
        (0, _chai.expect)(res.status).to.eq(400);
        done();
      });
    });
    it('should return error 401 if token is not provided', function (done) {
      var data = {
        owner: 'owner',
        status: 'avaialable',
        price: '2.5m',
        state: 'new',
        manufacturer: 'BMW',
        body_type: 'car',
        description: 'The car is still new',
        img: 'https://mydummyimgurl.com'
      };

      _chai["default"].request(_app["default"]).post('/api/v1/car').send(data).end(function (err, res) {
        (0, _chai.expect)(res.status).to.eq(401);

        _chai.assert.strictEqual(res.body.status, 401, 'Status is not 401');

        _chai.assert.strictEqual(res.body.error, 'Authentication failed! Please Login again', 'Expect error to be Authentication failed! Please Login again');

        _chai.assert.isNull(err, 'Expect error to not exist');

        done();
      });
    });
    it('Should return an error if token is not valid', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/car').set({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ayJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCRyMWN2ZFhDQ0s1bldaa2oycmQ0NlZlRUpTeEd6SmNOcG9CaWp5RXhYTFRGLm1oeC4uZXdIZSIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU4OTEyODA4LCJleHAiOjE1NTg5MjM2MDh9.ZS813EEUegCYU3suHV1NwunqEZ4RvRzaKyoJ96iwl6E'
      }).send({
        manufacturer: 'Toyota',
        model: 'Corolla',
        price: '14,500',
        state: 'new',
        year: '2018',
        bodyType: 'Saloon'
      }).end(function (err, res) {
        (0, _chai.expect)(res.statusCode).to.equal(401);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body.status).to.equal(401);
        (0, _chai.expect)(res.body.error).to.equal('Authentication failed! Please Login again');

        _chai.assert.isObject(res.body, 'Response is not an object');

        _chai.assert.strictEqual(res.statusCode, 401, 'Status code is not 401');

        _chai.assert.strictEqual(res.body.status, 401, 'Status is not 401');

        _chai.assert.strictEqual(res.body.error, 'Authentication failed! Please Login again', 'Expect error to be Authentication failed! Please Login again');

        _chai.assert.isNull(err, 'Expect error to not exist');

        done();
      });
    });
    describe('view available cars by manufacturer', function () {
      var manufacturers = ['Honda', 'Mercedes', 'Peugeot'];
      it('should return all unsold cars by a manufacturer', function (done) {
        carsArray();

        _chai["default"].request(_app["default"]).get("/api/v1/car/manufacturer/".concat(manufacturers[0])).end(function (err, res) {
          (0, _chai.expect)(res.status).to.eq(200);
          (0, _chai.expect)(res.body).to.have.property('data').to.be.an('Array');
          done();
        });
      });
      it('should return a custom error if no vehicle is found for the manufacturer', function (done) {
        carsArray();

        _chai["default"].request(_app["default"]).get('/api/v1/car/manufacturer/tyonum').end(function (err, res) {
          (0, _chai.expect)(res.status).to.eq(404);
          (0, _chai.expect)(res.body.message).to.eq('There are no cars for the selected manufacturer');
          done();
        });
      });
    }); // unsold cars by body type

    describe('view available cars by body type', function () {
      var bodyType = ['saloon', 'suv', 'jeep', 'wagon', 'bus'];
      it('should return all unsold cars by body type', function (done) {
        carsArray();

        _chai["default"].request(_app["default"]).get("/api/v1/car/bodytype/".concat(bodyType[0])).end(function (err, res) {
          (0, _chai.expect)(res.status).to.eq(200);
          (0, _chai.expect)(res.body).to.have.property('data').to.be.an('Array');
          done();
        });
      });
      it('should return error 404 if cars of given body type are not found', function (done) {
        carsArray();

        _chai["default"].request(_app["default"]).get("/api/v1/car/bodytype/".concat(bodyType[2])).end(function (err, res) {
          (0, _chai.expect)(res.status).to.eq(404);
          (0, _chai.expect)(res.body.message).to.eq('There are no cars for the selected body_type');
          done();
        });
      });
    }); // view available cars by state (used, new)

    describe('view available cars by state', function () {
      var state = ['used', 'New'];
      it('should return all available used cars', function (done) {
        carsArray();

        _chai["default"].request(_app["default"]).get("/api/v1/car/state/".concat(state[0])).end(function (err, res) {
          (0, _chai.expect)(res.status).to.eq(200);
          (0, _chai.expect)(res.body).to.have.property('data').to.be.an('ARRAY');
          (0, _chai.expect)(res.body.data[0]).to.have.property('state').eq('used');
          done();
        });
      });
      it('should return all available new cars', function (done) {
        carsArray();

        _chai["default"].request(_app["default"]).get("/api/v1/car/state/".concat(state[1])).end(function (err, res) {
          (0, _chai.expect)(res.status).to.eq(200);
          (0, _chai.expect)(res.body).to.have.property('data').to.be.an('ARRAY');
          (0, _chai.expect)(res.body.data[0]).to.have.property('state').eq(state[1]);
          done();
        });
      });
      it('should return error 404 if cars are not found for selected state -old', function (done) {
        carsArray();

        _chai["default"].request(_app["default"]).get('/api/v1/car/state/old').end(function (err, res) {
          (0, _chai.expect)(res.status).to.eq(404);
          (0, _chai.expect)(res.body.message).to.eq('There are no cars for the selected state');
          done();
        });
      });
    }); // view all unsold cars

    describe('view all available cars', function () {
      it('should return all unsold cars', function (done) {
        carsArray();

        _chai["default"].request(_app["default"]).get('/api/v1/cars/status/available').end(function (err, res) {
          (0, _chai.expect)(res.status).to.eq(200);
          (0, _chai.expect)(res.body).to.have.property('data').to.be.an('ARRAY');
          done();
        });
      });
      it('should return 404 when there are no unsold cars', function (done) {
        _car["default"].cars = [];

        _chai["default"].request(_app["default"]).get('/api/v1/cars/status/available').end(function (err, res) {
          (0, _chai.expect)(res.status).to.eq(404);
          (0, _chai.expect)(res.body.message).to.eq('No cars available now. Try again later');
          done();
        });
      });
    }); // get ad by id

    describe('Get ad by id', function () {
      it('should return a single ad details', function (done) {
        carsArray();
        var id = _cars["default"][0].id;

        _chai["default"].request(_app["default"]).get("/api/v1/car/".concat(id)).end(function (err, res) {
          (0, _chai.expect)(res.status).to.eq(200);
          done();
        });
      });
      it('should return error 400 with custom message if supplied id is not valid', function (done) {
        carsArray();

        _chai["default"].request(_app["default"]).get('/api/v1/car/12345678901').end(function (err, res) {
          (0, _chai.expect)(res.status).to.eq(400);
          (0, _chai.expect)(res.body.message).to.eq('Invalid Car ad Record. id cannot be greater than 10000');
          done();
        });
      });
      it('should return error 404 with custom message if ad is not found', function (done) {
        carsArray();

        _chai["default"].request(_app["default"]).get('/api/v1/car/2598').end(function (err, res) {
          (0, _chai.expect)(res.status).to.eq(404);
          (0, _chai.expect)(res.body.message).to.eq('No Car Record Found');
          done();
        });
      });
    }); // seller update ad price

    describe('Seller update ad price', function () {
      it('should return error 404 if ad is not found', function () {
        var user = _users["default"][0];
        user.isAdmin = false;
        _car["default"].cars = [];
        var reqData = {
          id: 8118,
          price: 2400000,
          email: 'mart@gmail.com',
          password: 'wer3458900fg',
          description: 'This is to add further description'
        };

        _chai["default"].request(_app["default"]).patch("/api/v1/car/".concat(reqData.id, "/price")).set({
          Authorization: token
        }).send(reqData).end(function (err, res) {
          (0, _chai.expect)(res.status).to.eq(404);
          (0, _chai.expect)(res.body.message).to.eq('The advert to update is not available');
        });
      });
      it('should return error 401 if another user attempts update an ad', function () {
        carsArray();
        usersArray();
        var user = _users["default"][0];
        user.isAdmin = false;
        var price = _cars["default"][0].price - 1000000;
        _cars["default"][0].owner = _users["default"][1].id;
        var reqData = {
          id: _cars["default"][0].id,
          price: price,
          email: 'mart@gmail.com',
          password: 'wer3458900fg',
          description: 'This is to add further description'
        };

        _chai["default"].request(_app["default"]).patch("/api/v1/car/".concat(reqData.id, "/price")).set({
          Authorization: token
        }).send(reqData).end(function (err, res) {
          (0, _chai.expect)(res.status).to.eq(401);
          (0, _chai.expect)(res.body.message).to.eq('You do not have the permission to update this data');
        });
      });
      it('should return error 401 if user is not logged in', function () {
        carsArray();
        var reqData = {
          id: _cars["default"][0].id,
          price: _cars["default"][0].price - 100,
          email: 'mart@gmail.com',
          password: 'wer3458900fg',
          description: 'This is to add further description'
        };

        _chai["default"].request(_app["default"]).patch("/api/v1/car/".concat(reqData.id, "/price")).send(reqData).end(function (err, res) {
          (0, _chai.expect)(res.status).to.eq(401);
          (0, _chai.expect)(res.body.error).to.eq('Authentication failed! Please Login again');
        });
      });
    }); // get single ad

    describe('User can view single ad', function () {
      it('should return full details of an ad', function (done) {
        carsArray();
        var id = _cars["default"][0].id;

        _chai["default"].request(_app["default"]).get("/api/v1/car/".concat(id)).end(function (err, res) {
          (0, _chai.expect)(res.status).to.eq(200);
          (0, _chai.expect)(res.body).to.have.property('data');
          (0, _chai.expect)(res.body.data.id).to.eq(id);
          done();
        });
      });
      it('should return error 404 if ad is not found', function (done) {
        carsArray();
        var id = _cars["default"][0].id + 150;

        _chai["default"].request(_app["default"]).get("/api/v1/car/".concat(id)).end(function (err, res) {
          (0, _chai.expect)(res.status).to.eq(404);
          (0, _chai.expect)(res.body.message).to.eq('No Car Record Found');
          done();
        });
      });
      it('should return error 400 if invalid ad id is supplied', function (done) {
        carsArray();

        _chai["default"].request(_app["default"]).get('/api/v1/car/155873165645').end(function (err, res) {
          (0, _chai.expect)(res.status).to.eq(400);
          (0, _chai.expect)(res.body.message).to.eq('Invalid Car ad Record. id cannot be greater than 10000');
          done();
        });
      });
    }); // get ads within a price range

    describe('Get ads within a price range', function () {
      it('should return an array of ads within a price range', function (done) {
        carsArray();

        _chai["default"].request(_app["default"]).get('/api/v1/car/price/?min=2000000&max=8000000').end(function (err, res) {
          (0, _chai.expect)(res.status).to.eq(200);
          (0, _chai.expect)(res.body.data).to.be.an('ARRAY');
          done();
        });
      });
      it('Minimum should default to 0 if not supplied', function (done) {
        carsArray();

        _chai["default"].request(_app["default"]).get('/api/v1/car/price/?max=8000000').end(function (err, res) {
          (0, _chai.expect)(res.status).to.eq(200);
          (0, _chai.expect)(res.body.data).to.be.an('ARRAY');
          done();
        });
      });
      it('Maximum should default to 5000000 if not supplied', function (done) {
        carsArray();

        _chai["default"].request(_app["default"]).get('/api/v1/car/price/?min=2000000').end(function (err, res) {
          (0, _chai.expect)(res.status).to.eq(200);
          (0, _chai.expect)(res.body.data).to.be.an('ARRAY');
          done();
        });
      });
      it('Should return error 404 if no ads are found in the given range', function (done) {
        carsArray();

        _chai["default"].request(_app["default"]).get('/api/v1/car/price/?min=12000000&max=24000000').end(function (err, res) {
          (0, _chai.expect)(res.status).to.eq(404);
          (0, _chai.expect)(res.body.message).to.eq('There are no cars within the selected price range');
          done();
        });
      });
    }); // admin can view all ads whether sold or available

    describe('admin view all ads', function () {
      it('should return all ads', function (done) {
        var user = _users["default"][0];
        user.isAdmin = true;
        carsArray();

        _chai["default"].request(_app["default"]).get('/api/v1/auth/admin/cars').set({
          Authorization: token
        }).end(function (err, res) {
          (0, _chai.expect)(res.status).to.eq(200);
          (0, _chai.expect)(res.body.data).to.be.an('Array');
          (0, _chai.expect)(res.body.data[0]).to.be.an('Object');
          done();
        });
      });
      it('should return error 404 if there are no ads available', function (done) {
        var user = _users["default"][0];
        user.isAdmin = true;
        _car["default"].cars = [];

        _chai["default"].request(_app["default"]).get('/api/v1/auth/admin/cars').set({
          Authorization: token
        }).end(function (err, res) {
          (0, _chai.expect)(res.body.status).to.eq(404);
          (0, _chai.expect)(res.body.message).to.eq('No Car Record Found. Try again Later');
          done();
        });
      });
      it('should return error 401 if user is not logged in', function (done) {
        carsArray();

        _chai["default"].request(_app["default"]).get('/api/v1/auth/admin/cars').end(function (err, res) {
          (0, _chai.expect)(res.body.status).to.eq(401);
          (0, _chai.expect)(res.body.message).to.eq('No authorization token provided');
          done();
        });
      });
    }); // admin can delete any posted ad

    describe('Admin can delete a posted ad', function () {
      it('should delete a posted ad', function (done) {
        var user = _users["default"][0];
        user.isAdmin = true;
        carsArray();

        _chai["default"].request(_app["default"])["delete"]("/api/v1/auth/admin/cars/".concat(_cars["default"][0].id)).set({
          Authorization: token
        }).end(function (err, res) {
          (0, _chai.expect)(res.status).to.eq(200);
          (0, _chai.expect)(res.body.message).to.eq('Ad successfully deleted');
          done();
        });
      });
      it('should return error 401 if user is not admin or not logged in', function (done) {
        carsArray();

        _chai["default"].request(_app["default"])["delete"]("/api/v1/auth/admin/cars/".concat(_cars["default"][0].id)).end(function (err, res) {
          (0, _chai.expect)(res.status).to.eq(401);
          (0, _chai.expect)(res.body.message).to.eq('No authorization token provided');
          done();
        });
      });
      it('should return error 404 if wrong ad id is given', function (done) {
        var user = _users["default"][0];
        user.isAdmin = true;
        carsArray();
        var id = _cars["default"][0].id + 1;

        _chai["default"].request(_app["default"])["delete"]("/api/v1/auth/admin/cars/".concat(id)).set({
          Authorization: token
        }).end(function (err, res) {
          (0, _chai.expect)(res.status).to.eq(404);
          (0, _chai.expect)(res.body.message).to.eq('The ad is no longer available');
          done();
        });
      });
      it('should return error 404 if ad is not available', function (done) {
        var user = _users["default"][0];
        user.isAdmin = true;
        var id = _cars["default"][0].id;
        _car["default"].cars = [];

        _chai["default"].request(_app["default"])["delete"]("/api/v1/auth/admin/cars/".concat(id)).set({
          Authorization: token
        }).end(function (err, res) {
          (0, _chai.expect)(res.status).to.eq(404);
          (0, _chai.expect)(res.body.message).to.eq('The ad is no longer available');
          done();
        });
      });
    });
  });
});