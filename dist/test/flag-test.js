"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _cars = _interopRequireDefault(require("./mock_db/cars"));

var _app = _interopRequireDefault(require("../app"));

var _car = _interopRequireDefault(require("../models/car"));

var _user = _interopRequireDefault(require("../models/user"));

var _flag = _interopRequireDefault(require("../models/flag"));

var _users = _interopRequireDefault(require("./mock_db/users"));

var _flags = _interopRequireDefault(require("./mock_db/flags"));

var _queries = _interopRequireDefault(require("../migration/queries"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var expect = _chai["default"].expect;

_chai["default"].use(_chaiHttp["default"]);

var token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo1LCJlbWFpbCI6Im1hcnRpbmlyZXhAeWFob28uY28udWsiLCJmaXJzdF9uYW1lIjoiSWJ1RXJpYyIsImxhc3RfbmFtZSI6Ik1hcnRpbmkiLCJwYXNzd29yZCI6IiIsImFkZHJlc3MiOiIxLCBhZHJlc3Mgc3RyZWV0IiwiaXNfYWRtaW4iOmZhbHNlLCJzdGF0dXMiOiJyZWdpc3RlcmVkIn0sImlhdCI6MTU2MzE4NDY2NiwiZXhwIjoxNTYzMzE0MjY2fQ.eD6lUU0Jqeaa6HZvISs6DtV0WHpm1LwlZnIsZ4V-Wys';
describe('Flags controller', function () {
  describe('Create a flag', function () {
    it('should create a flag on an ad', function (done) {
      _cars["default"][0].owner = _users["default"][1].id;
      _car["default"].cars = _cars["default"];
      _user["default"].users = _users["default"];
      var user = _users["default"][0];
      user.is_admin = true;
      var data = {
        user_id: 3,
        car_id: 1,
        reason: 'Wrong Description',
        description: 'fake car description'
      };

      _chai["default"].request(_app["default"]).post('/api/v1/flag').set('Authorization', token).send(data).end(function (err, res) {
        expect(res.status).to.eq(201);
        expect(res.body.data).to.have.property('id');
        expect(res.body.data).to.have.property('car_id');
        expect(res.body.data.reason).to.eq(data.reason);
        done();
      });
    });
    it('should return 400 error if car id is not stated', function (done) {
      _cars["default"][0].owner = _users["default"][1].id;
      _car["default"].cars = _cars["default"];
      _user["default"].users = _users["default"];
      var user = _users["default"][0];
      user.is_admin = false;
      var data = {
        user_id: user.id,
        car_id: '',
        reason: 'stolen',
        description: 'Bad description of the car '
      };

      _chai["default"].request(_app["default"]).post('/api/v1/flag').set('Authorization', token).send(data).end(function (err, res) {
        expect(res.status).to.eq(400);
        expect(res.body.car_id).to.equal(undefined);
        expect(res.body.message).to.eq('car id must be a number');
        done();
      });
    });
    it('should return error 400 if reason is not stated',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var _ref2, rows, car_id, newFlag, res;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _queries["default"].query("INSERT INTO cars (manufacturer, model, price, state, status, year,created_on, body_type, owner, img) VALUES  ('Honda', 'Accord', 8000000, 'used', 'available',\n      '2017-01-06', '2019-07-26', 'saloon' , 3, 'https://res.cloudinary.com/automart-app/image/upload/v1562580189/Honda_Accord_h4yg60.jpg')");

            case 2:
              _context.next = 4;
              return _queries["default"].query('SELECT car_id FROM cars');

            case 4:
              _ref2 = _context.sent;
              rows = _ref2.rows;
              car_id = rows[0].car_id;
              newFlag = {
                user_id: 2,
                car_id: car_id,
                reason: '',
                description: 'fake and fraudulent car'
              };
              _context.next = 10;
              return _chai["default"].request(_app["default"]).post('/api/v1/flag').set('Authorization', token).send(newFlag);

            case 10:
              res = _context.sent;
              expect(res.status).to.eq(400);
              expect(res.body.error).to.eq('Reason field cannot be empty');

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    it('should return 400 error if user_id is not stated',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _chai["default"].request(_app["default"]).post('api/v1/app').set('Authorization', token).send({
                user_id: '',
                car_id: 2,
                reason: 'stolen',
                description: 'Bad description of the car '
              }).then(function (res) {
                expect(res.status).to.eq(400);
                expect(res.status.message).to.equal('All fields must be filled');
              });

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    it('should return 500 internal server error if details are incorrect',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _chai["default"].request(_app["default"]).post('api/v1/flag').set('Authorization', token).then(function (res) {
                expect(res.status).to.eq(500);
                expect(res.body).to.equal('internal server error');
              });

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
  });
  describe('Update a flag', function () {
    it('should return error 404 if flag id is wrong',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var id, user, res;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _flags["default"][0].status = 'pending';
              id = _flags["default"][0].id;
              _flag["default"].flags = _flags["default"];
              _user["default"].users = _users["default"];
              user = _users["default"][0];
              user.is_admin = true;
              _context4.next = 8;
              return _chai["default"].request(_app["default"]).patch("/api/v1/flag/".concat(id + 1000)).set('Authorization', token).then(function (res) {
                expect(res.status).to.eq(404);
                expect(res.body.message).to.equal('Flag not found');
              });

            case 8:
              res = _context4.sent;

            case 9:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
  });
  describe('Get all flags', function () {
    it('should return all flags', function (done) {
      var user = _users["default"][0];
      _flag["default"].flagdb[0] = _flags["default"];
      user.isAdmin = true;

      _chai["default"].request(_app["default"]).get('/api/v1/flag').set('Authorization', token).end(function (err, res) {
        expect(res.status).to.eq(200);
        expect(res.body.data).to.be.an('Array');
        expect(res.body.data[0]).to.be.an('Object');
        done();
      });
    });
    it('should return error 404 if flag is not found',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5() {
      var res;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _chai["default"].request(_app["default"])["delete"]('/api/v1/flags/1271278338293').set('Authorization', token);

            case 2:
              res = _context5.sent;
              expect(res.status).to.eq(404);

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
  });
});