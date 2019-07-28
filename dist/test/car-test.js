"use strict";

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

require("regenerator-runtime");

var _fs = _interopRequireDefault(require("fs"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _path = _interopRequireDefault(require("path"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _app = _interopRequireDefault(require("../app"));

var _queries = _interopRequireDefault(require("../migration/queries"));

var _createTable = require("../migration/createTable");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//import genToken from '../helpers/generateToken';
var url = _path["default"].resolve('./');

_dotenv["default"].config();

_chai["default"].use(_chaiHttp["default"]);

var token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc19hZG1pbiI6ZmFsc2UsImZpcnN0X25hbWUiOiJEb24iLCJpYXQiOjE1NjM5OTY1MDAsImV4cCI6MTU2NDYwMTMwMH0.SMCMg903d1SDuxRTYBhTWL4KPdxap__UaLUPtisOp3g';
describe('Test car AD endpoint', function () {
  describe('Cars', function () {
    var user_id =
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _ref2, rows;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _queries["default"].query('SELECT id FROM users LIMIT 1');

              case 2:
                _ref2 = _context.sent;
                rows = _ref2.rows;
                return _context.abrupt("return", rows[0]);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function user_id() {
        return _ref.apply(this, arguments);
      };
    }();

    var carAd = {
      manufacturer: 'Mercedes',
      model: 'E500',
      price: 6000000,
      state: 'New',
      status: 'available',
      body_type: 'Saloon',
      year: 2019,
      owner: 2,
      img: 'C:/Users/Eric Ibu/Desktop/automart.github.io-gh-pages/server/test/img/car1.jpg'
    };
    it('should create a new car ad',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var user;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return user_id();

            case 2:
              user = _context2.sent;

              _chai["default"].request(_app["default"]).post('/api/v1/car').set('Authorization', token).field('img', 'C:/Users/Eric Ibu/Desktop/automart.github.io-gh-pages/server/test/img/car1.jpg').set('Content-Type', 'application/x-www-form-urlencoded').field('manufacturer', carAd.manufacturer).field('model', carAd.model).field('price', carAd.price).field('state', carAd.state).field('status', carAd.status).field('year', carAd.year).field('body_type', carAd.body_type).field('owner', 1).then(function (res) {
                (0, _chai.expect)(res.status).to.be.eql(201);
                (0, _chai.expect)(res.type).to.be.equal('application/json');
                (0, _chai.expect)(res.body).to.be.an('object');
              });

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    it('should return 400 error if invalid field data is supplied', function () {
      _chai["default"].request(_app["default"]).post('/api/v1/car').set('authorization', token).set('Content-Type', 'Multipart/form-data').field('status', 'available').field('price', '').field('image_url', 'img.jpg').field('model', 'E350').field('manufacturer', 'BMW').field('body_type', 'car').field('description', 'This is additional description').then(function (res) {
        (0, _chai.expect)(res.body.status).to.eq(400);
        (0, _chai.expect)(res.body.error).to.eq('Manufacturer cannot be empty');
      });
    });
    it('should return error 401 if user is not logged in',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var data, res;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              data = carAd;
              _context3.next = 3;
              return _chai["default"].request(_app["default"]).post('/api/v1/car').send(data);

            case 3:
              res = _context3.sent;
              (0, _chai.expect)(res.status).to.eq(401);
              (0, _chai.expect)(res.body.error).to.eq('Authentication failed! Please Login again');

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    describe('Test available cars by manufacturer', function () {
      it('should return all available cars',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        var _ref6, rows, res;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _queries["default"].query('SELECT manufacturer FROM cars LIMIT 1');

              case 2:
                _ref6 = _context4.sent;
                rows = _ref6.rows;
                _context4.next = 6;
                return _chai["default"].request(_app["default"]).get("/api/v1/car?status=available&manufacturer=".concat(rows[0].manufacturer)).set('authorization', token);

              case 6:
                res = _context4.sent;
                (0, _chai.expect)(res.status).to.eq(200);
                (0, _chai.expect)(res.body.data).to.be.an('Array');

              case 9:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      })));
      it('should return error  404 if there are no unsold cars for a selected manufacturer',
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
                return _chai["default"].request(_app["default"]).get('/api/v1/car/manufacturer/subaru').set('authorization', token);

              case 2:
                res = _context5.sent;
                (0, _chai.expect)(res.status).to.eq(404);
                (0, _chai.expect)(res.body.error).to.eq('There are no cars for the selected manufacturer');

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      })));
      it('should return error 401 if user is not logged in',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6() {
        var _ref9, rows, res;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _queries["default"].query('SELECT manufacturer FROM cars LIMIT 1');

              case 2:
                _ref9 = _context6.sent;
                rows = _ref9.rows;
                _context6.next = 6;
                return _chai["default"].request(_app["default"]).get("/api/v1/car/manufacturer/".concat(rows[0].manufacturer));

              case 6:
                res = _context6.sent;
                (0, _chai.expect)(res.status).to.eq(401);
                (0, _chai.expect)(res.body.error).to.eq('Authentication failed! Please Login again');

              case 9:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      })));
    });
    describe('view available cars by body type', function () {
      it('should return all unsold cars by body type',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7() {
        var _ref11, rows, res;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return _queries["default"].query('SELECT body_type FROM cars LIMIT 1');

              case 2:
                _ref11 = _context7.sent;
                rows = _ref11.rows;
                _context7.next = 6;
                return _chai["default"].request(_app["default"]).get("/api/v1/car?status=available&body_type=".concat(rows[0].body_type)).set('authorization', token);

              case 6:
                res = _context7.sent;
                (0, _chai.expect)(res.status).to.eq(200);
                (0, _chai.expect)(res.body).to.have.property('data').to.be.an('Array');

              case 9:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      })));
      it('should return error 404 if cars of given body type are not found',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8() {
        var res;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return _chai["default"].request(_app["default"]).get('/api/v1/car/body_type/truck').set('authorization', token);

              case 2:
                res = _context8.sent;
                (0, _chai.expect)(res.status).to.eq(404);
                (0, _chai.expect)(res.body.error).to.eq(undefined);

              case 5:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      })));
      it('should return all available cars by state',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee9() {
        var _ref14, rows, res;

        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return _queries["default"].query('SELECT state FROM cars LIMIT 1');

              case 2:
                _ref14 = _context9.sent;
                rows = _ref14.rows;
                _context9.next = 6;
                return _chai["default"].request(_app["default"]).get("/api/v1/car?status=available&state=".concat(rows[0].state)).set('authorization', token);

              case 6:
                res = _context9.sent;
                (0, _chai.expect)(res.status).to.eq(200);
                (0, _chai.expect)(res.body).to.have.property('data').to.be.an('ARRAY');

              case 9:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      })));
      it('should return error 404 if cars are not found for selected state',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee10() {
        var res;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return _chai["default"].request(_app["default"]).get('/api/v1/car/5/available').set('authorization', token);

              case 2:
                res = _context10.sent;
                (0, _chai.expect)(res.status).to.eq(404);
                (0, _chai.expect)(res.body.error).to.eq(undefined);

              case 5:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      })));
    });
    describe('view all available cars', function () {
      it('should return all unsold car ads',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee11() {
        var res;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return _chai["default"].request(_app["default"]).get('/api/v1/car?status=available').set('authorization', token);

              case 2:
                res = _context11.sent;
                (0, _chai.expect)(res.status).to.eq(200);
                (0, _chai.expect)(res.body).to.have.property('data').to.be.an('ARRAY');

              case 5:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      })));
    });
    describe('view car ad by id', function () {
      it('should return a car ad detail',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee12() {
        var _ref18, rows, res;

        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return _queries["default"].query('SELECT car_id FROM cars limit 1');

              case 2:
                _ref18 = _context12.sent;
                rows = _ref18.rows;
                _context12.next = 6;
                return _chai["default"].request(_app["default"]).get("/api/v1/car/".concat(rows[0].car_id)).set('authorization', token);

              case 6:
                res = _context12.sent;
                (0, _chai.expect)(res.status).to.eq(200);
                (0, _chai.expect)(res.body.data.car_id).to.eq(rows[0].car_id);

              case 9:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12);
      })));
      it('should return error 400 if ad id is greater than 10000',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee13() {
        var res;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.next = 2;
                return _chai["default"].request(_app["default"]).get('/api/v1/car/9293837414384').set('authorization', token);

              case 2:
                res = _context13.sent;
                (0, _chai.expect)(res.status).to.eq(400);
                (0, _chai.expect)(res.body.message).to.eq('Invalid Car ad Record. id cannot be greater than 10000');

              case 5:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13);
      })));
      it('should return error 404 if ad is not found',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee14() {
        var res;
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.next = 2;
                return _chai["default"].request(_app["default"]).get('/api/v1/car/9299').set('authorization', token);

              case 2:
                res = _context14.sent;
                (0, _chai.expect)(res.status).to.eq(404);
                (0, _chai.expect)(res.body.error).to.eq('No Car Record Found');

              case 5:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14);
      })));
    });
    describe('view all available cars', function () {
      it('should return all unsold cars',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee15() {
        var res;
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _context15.next = 2;
                return _chai["default"].request(_app["default"]).get('/api/v1/car?status=available').set('authorization', token);

              case 2:
                res = _context15.sent;
                (0, _chai.expect)(res.status).to.eq(200);
                (0, _chai.expect)(res.body).to.have.property('data').to.be.an('ARRAY');

              case 5:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15);
      })));
    });
    describe('update car ad price', function () {
      it('should return success 200 with updated price',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee16() {
        var _ref23, rows, res;

        return regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                _context16.next = 2;
                return _queries["default"].query("INSERT INTO cars ( manufacturer, model, price, state, status, body_type, year, created_on, owner, img)\n     VALUES( 'Honda', 'Acoord', '5000000', 'New', 'available', 'saloon', '2015-01-04', '2013-05-06', '1', 'https://res.cloudinary.com/automart-app/image/upload/v1562580189/Honda_Accord_h4yg60.jpg')");

              case 2:
                _context16.next = 4;
                return _queries["default"].query('SELECT car_id, owner FROM cars LIMIT 1');

              case 4:
                _ref23 = _context16.sent;
                rows = _ref23.rows;
                _context16.next = 8;
                return _chai["default"].request(_app["default"]).patch("/api/v1/car/".concat(rows[0].car_id, "/price")).set('authorization', token).send({
                  price: 6500000,
                  user_id: rows[0].id,
                  status: 'available'
                });

              case 8:
                res = _context16.sent;
                (0, _chai.expect)(res.status).to.eq(200);

              case 10:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16);
      })));
      it('should return error if user is not the owner',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee17() {
        var _ref25, rows, res;

        return regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                _context17.next = 2;
                return _queries["default"].query("INSERT INTO cars ( manufacturer, model, price, state, status, body_type, year, created_on, owner, img)\n     VALUES( 'Honda', 'Acoord', '5000000', 'New', 'available', 'saloon', '2015-01-04', '2013-05-06', '1', 'https://res.cloudinary.com/automart-app/image/upload/v1562580189/Honda_Accord_h4yg60.jpg')");

              case 2:
                _context17.next = 4;
                return _queries["default"].query('SELECT car_id FROM cars LIMIT 1');

              case 4:
                _ref25 = _context17.sent;
                rows = _ref25.rows;
                _context17.next = 8;
                return _chai["default"].request(_app["default"]).patch("/api/v1/car/".concat(rows[0].car_id, "/price")).set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdE5hbWUiOiJFcmljIiwibGFzdE5hbWUiOiJJYnUiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCRwZ0xwMThFQTJQbXBhMzAvR3VuVzFPcFQ2LkhyM2NDRi8wUjk1UGRxNzBXQ1RKNTRXdUtBRyIsImFkZHJlc3MiOiIxMDAgd2VzdHdheSBCZXN0d2F5IiwiZW1haWwiOiJtYXJ0aW5pcmV4QHlhaG9vLmNvLnVrIiwiaXNBZG1pbiI6dHJ1ZX0sImlhdCI6MTU2MTI2MzY0NCwiZXhwIjoxNTYxNDM2NDQ0fQ.Ad6FM0hE-y41gBlDURfMVR9eLh0-fV5PmwVzXO2hthg').send({
                  price: 7800000
                });

              case 8:
                res = _context17.sent;
                (0, _chai.expect)(res.status).to.eq(401);
                (0, _chai.expect)(res.body.error).to.eq('Authentication failed! Please Login again');

              case 11:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17);
      })));
      it('should return error 401 if user is not logged in',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee18() {
        var _ref27, rows, res;

        return regeneratorRuntime.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                _context18.next = 2;
                return _queries["default"].query('SELECT car_id FROM cars limit 1');

              case 2:
                _ref27 = _context18.sent;
                rows = _ref27.rows;
                _context18.next = 6;
                return _chai["default"].request(_app["default"]).patch("/api/v1/car/".concat(rows[0].car_id, "/price")).send({
                  price: 6000000
                });

              case 6:
                res = _context18.sent;
                (0, _chai.expect)(res.status).to.eq(401);
                (0, _chai.expect)(res.body.error).to.eq('Authentication failed! Please Login again');

              case 9:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18);
      })));
    });
    describe('User can view car ad', function () {
      it('should return full details of an ad',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee19() {
        var _ref29, rows, res;

        return regeneratorRuntime.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                _context19.next = 2;
                return _queries["default"].query('SELECT car_id FROM cars limit 1');

              case 2:
                _ref29 = _context19.sent;
                rows = _ref29.rows;
                _context19.next = 6;
                return _chai["default"].request(_app["default"]).get("/api/v1/car/".concat(rows[0].car_id)).set('authorization', token);

              case 6:
                res = _context19.sent;
                (0, _chai.expect)(res.status).to.eq(200);
                (0, _chai.expect)(res.body).to.have.property('data');
                (0, _chai.expect)(res.body.data.id).to.eq(rows[0].id);

              case 10:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19);
      })));
      it('should return error 404 if ad is not found',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee20() {
        var res;
        return regeneratorRuntime.wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                _context20.next = 2;
                return _chai["default"].request(_app["default"]).get('/api/v1/car/12').set('authorization', token);

              case 2:
                res = _context20.sent;
                (0, _chai.expect)(res.status).to.eq(404);
                (0, _chai.expect)(res.body.error).to.eq('No Car Record Found');

              case 5:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20);
      })));
      it('should return error 500 internal server error if car ad is invalid ',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee21() {
        var res;
        return regeneratorRuntime.wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                _context21.next = 2;
                return _chai["default"].request(_app["default"]).get('/api/v1/car/aaa').set('authorization', token);

              case 2:
                res = _context21.sent;
                (0, _chai.expect)(res.status).to.eq(500);
                (0, _chai.expect)(res.body.message).to.eq(undefined);

              case 5:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee21);
      })));
    }); // get ads within a price range

    describe('Get ads within a price range', function () {
      it('should return an array of ads within a price range',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee22() {
        var data, res;
        return regeneratorRuntime.wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                _context22.next = 2;
                return user_id();

              case 2:
                data = _context22.sent;
                _context22.next = 5;
                return _chai["default"].request(_app["default"]).get('/api/v1/car?status=available&min=1000000&max=12000000').set('authorization', token);

              case 5:
                res = _context22.sent;
                (0, _chai.expect)(res.status).to.eq(200);
                (0, _chai.expect)(res.body.data).to.be.an('ARRAY');

              case 8:
              case "end":
                return _context22.stop();
            }
          }
        }, _callee22);
      })));
      it('should return ads within price range if max and min are not supplied',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee23() {
        var data, res;
        return regeneratorRuntime.wrap(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                _context23.next = 2;
                return user_id();

              case 2:
                data = _context23.sent;
                _context23.next = 5;
                return _chai["default"].request(_app["default"]).get('/api/v1/car?status=available&min=&max=').set('authorization', token);

              case 5:
                res = _context23.sent;
                (0, _chai.expect)(res.status).to.eq(200);
                (0, _chai.expect)(res.body.data).to.be.an('ARRAY');

              case 8:
              case "end":
                return _context23.stop();
            }
          }
        }, _callee23);
      })));
    }); // admin can view all ads whether sold or available

    describe('User view all ads', function () {
      it('should return all cars',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee24() {
        var res;
        return regeneratorRuntime.wrap(function _callee24$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                _context24.next = 2;
                return _chai["default"].request(_app["default"]).get('/api/v1/car').set('authorization', token);

              case 2:
                res = _context24.sent;
                (0, _chai.expect)(res.status).to.eq(200);
                (0, _chai.expect)(res.body.data).to.be.an('Array');
                (0, _chai.expect)(res.body.data[0]).to.be.an('Object');

              case 6:
              case "end":
                return _context24.stop();
            }
          }
        }, _callee24);
      })));
      it('should return error 404 if there are no ads available',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee25() {
        var res;
        return regeneratorRuntime.wrap(function _callee25$(_context25) {
          while (1) {
            switch (_context25.prev = _context25.next) {
              case 0:
                _context25.next = 2;
                return _queries["default"].query('DELETE FROM cars');

              case 2:
                _context25.next = 4;
                return _chai["default"].request(_app["default"]).get('/api/v1/car').set('authorization', token);

              case 4:
                res = _context25.sent;
                (0, _chai.expect)(res.body.status).to.eq(404);
                (0, _chai.expect)(res.body.message).to.eq('No Car Record Found. Try again Later');

              case 7:
              case "end":
                return _context25.stop();
            }
          }
        }, _callee25);
      })));
      it('should return error 401 if user is not logged in',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee26() {
        var res;
        return regeneratorRuntime.wrap(function _callee26$(_context26) {
          while (1) {
            switch (_context26.prev = _context26.next) {
              case 0:
                _context26.next = 2;
                return _chai["default"].request(_app["default"]).get('/api/v1/car');

              case 2:
                res = _context26.sent;
                (0, _chai.expect)(res.body.status).to.eq(401);
                (0, _chai.expect)(res.body.error).to.eq('Authentication failed! Please Login again');

              case 5:
              case "end":
                return _context26.stop();
            }
          }
        }, _callee26);
      })));
    }); // admin can delete any posted ad

    describe('Owner can delete his/her posted ad', function () {
      it('should delete a posted ad',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee27() {
        var user, _ref38, rows, res;

        return regeneratorRuntime.wrap(function _callee27$(_context27) {
          while (1) {
            switch (_context27.prev = _context27.next) {
              case 0:
                _context27.next = 2;
                return user_id();

              case 2:
                user = _context27.sent;
                _context27.next = 5;
                return _queries["default"].query("INSERT INTO cars ( manufacturer, model, price, state, status, body_type, year, created_on, owner, img)\n     VALUES( 'Honda', 'Acoord', '5000000', 'New', 'available', 'saloon', '2015-01-04', '2013-05-06', '1', 'https://res.cloudinary.com/automart-app/image/upload/v1562580189/Honda_Accord_h4yg60.jpg'),\n     ( 'BMW', 'I-8', '4500000', 'used', 'available', 'wagon', '2016-01-04', '2017-05-11', '2', 'https://res.cloudinary.com/automart-app/image/upload/v1562580189/Honda_Accord_h4yg60.jpg'),\n     ( 'Mercedes', 'E300', '7500000', 'used', 'available', 'saloon', '2014-01-01', '2008-09-07', '3', 'https://res.cloudinary.com/automart-app/image/upload/v1562580189/Honda_Accord_h4yg60.jpg'),\n     ( 'Peugot', '409', '2000000', 'New', 'available', 'saloon', '2009-01-01', '2015-06-13', '3', 'https://res.cloudinary.com/automart-app/image/upload/v1562580189/Honda_Accord_h4yg60.jpg')");

              case 5:
                _context27.next = 7;
                return _queries["default"].query('SELECT car_id FROM cars LIMIT 1');

              case 7:
                _ref38 = _context27.sent;
                rows = _ref38.rows;
                _context27.next = 11;
                return _chai["default"].request(_app["default"])["delete"]("/api/v1/car/".concat(rows[0].car_id)).set('authorization', token);

              case 11:
                res = _context27.sent;
                (0, _chai.expect)(res.status).to.eq(200);
                (0, _chai.expect)(res.body.data.car_id).to.eq(rows[0].car_id);

              case 14:
              case "end":
                return _context27.stop();
            }
          }
        }, _callee27);
      })));
      it('should return error 401 if user is not logged in',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee28() {
        var data, _ref40, rows, res;

        return regeneratorRuntime.wrap(function _callee28$(_context28) {
          while (1) {
            switch (_context28.prev = _context28.next) {
              case 0:
                _context28.next = 2;
                return user_id();

              case 2:
                data = _context28.sent;
                _context28.next = 5;
                return _queries["default"].query("INSERT INTO cars ( manufacturer, model, price, state, status, body_type, year, created_on, owner, img)\n     VALUES( 'Honda', 'Acoord', '5000000', 'New', 'available', 'saloon', '2015-01-04', '2013-05-06', '1', 'https://res.cloudinary.com/automart-app/image/upload/v1562580189/Honda_Accord_h4yg60.jpg'),\n     ( 'BMW', 'I-8', '4500000', 'used', 'available', 'wagon', '2016-01-04', '2017-05-11', '2', 'https://res.cloudinary.com/automart-app/image/upload/v1562580189/Honda_Accord_h4yg60.jpg'),\n     ( 'Mercedes', 'E300', '7500000', 'used', 'available', 'saloon', '2014-01-01', '2008-09-07', '3', 'https://res.cloudinary.com/automart-app/image/upload/v1562580189/Honda_Accord_h4yg60.jpg'),\n     ( 'Peugot', '409', '2000000', 'New', 'available', 'saloon', '2009-01-01', '2015-06-13', '3', 'https://res.cloudinary.com/automart-app/image/upload/v1562580189/Honda_Accord_h4yg60.jpg')");

              case 5:
                _context28.next = 7;
                return _queries["default"].query('SELECT car_id FROM cars LIMIT 1');

              case 7:
                _ref40 = _context28.sent;
                rows = _ref40.rows;
                _context28.next = 11;
                return _chai["default"].request(_app["default"])["delete"]("/api/v1/car/".concat(rows[0].car_id));

              case 11:
                res = _context28.sent;
                (0, _chai.expect)(res.status).to.eq(401);
                (0, _chai.expect)(res.body.error).to.eq('Authentication failed! Please Login again');

              case 14:
              case "end":
                return _context28.stop();
            }
          }
        }, _callee28);
      })));
      it('should return error 404 if ad is not found',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee29() {
        var res;
        return regeneratorRuntime.wrap(function _callee29$(_context29) {
          while (1) {
            switch (_context29.prev = _context29.next) {
              case 0:
                _context29.next = 2;
                return _chai["default"].request(_app["default"])["delete"]('/api/v1/car/13').set('authorization', token);

              case 2:
                res = _context29.sent;
                (0, _chai.expect)(res.status).to.eq(404);
                (0, _chai.expect)(res.body.message).to.eq('This ad is not available');

              case 5:
              case "end":
                return _context29.stop();
            }
          }
        }, _callee29);
      })));
    });
  });
});