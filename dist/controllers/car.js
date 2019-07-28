"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _car = _interopRequireDefault(require("../migration/car"));

require("regenerator-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_dotenv["default"].config();

_cloudinary["default"].v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_SECRET
});

var CarAds = {
  createAd: function () {
    var _createAd = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res) {
      var _req$body, manufacturer, model, price, state, status, year, body_type, owner, img, props, validData, created_on, imgUrl, car, newAd;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _req$body = req.body, manufacturer = _req$body.manufacturer, model = _req$body.model, price = _req$body.price, state = _req$body.state, status = _req$body.status, year = _req$body.year, body_type = _req$body.body_type, owner = _req$body.owner, img = _req$body.img;
              props = [manufacturer, model, price, state, status, year, body_type, owner, img];

              validData = function validData(property, data) {
                return property.find(function (idx) {
                  return data[idx] === undefined || data[idx] === '';
                });
              };

              if (!(!validData(props, req.body) || !img)) {
                _context.next = 5;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                status: 400,
                message: 'Fill all required fields'
              }));

            case 5:
              created_on = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
              manufacturer = manufacturer.trim().replace(/\s+/g, '');
              model = model.trim().replace(/\s+/g, '');
              price = parseInt(price);
              state = state.trim().replace(/\s+/g, '');
              status = status.trim().replace(/\s+/g, '');
              year = parseInt(year, 10);
              body_type = body_type.trim().replace(/\s+/g, '');
              owner = parseInt(owner);
              _context.prev = 14;

              if (!req.file) {
                _context.next = 21;
                break;
              }

              _context.next = 18;
              return _cloudinary["default"].uploader.upload(req.file.path, {
                folder: 'automart-app/',
                format: 'jpg'
              });

            case 18:
              _context.t0 = _context.sent;
              _context.next = 22;
              break;

            case 21:
              _context.t0 = {
                url: req.img_url
              };

            case 22:
              imgUrl = _context.t0;
              car = [req.body.manufacturer, req.body.model, req.body.price, req.body.state, req.body.status, req.body.body_type, req.body.year, created_on, req.body.owner, req.body.img];
              _context.next = 26;
              return _car["default"].newCarAd(car);

            case 26:
              newAd = _context.sent;
              return _context.abrupt("return", res.status(201).json({
                status: 201,
                data: newAd.rows[0]
              }));

            case 30:
              _context.prev = 30;
              _context.t1 = _context["catch"](14);
              return _context.abrupt("return", res.status(_context.t1.statusCode || 500).json(_context.t1.message));

            case 33:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[14, 30]]);
    }));

    function createAd(_x, _x2) {
      return _createAd.apply(this, arguments);
    }

    return createAd;
  }(),
  getAllCars: function () {
    var _getAllCars = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res) {
      var _ref, rows;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _car["default"].getAllCars();

            case 3:
              _ref = _context2.sent;
              rows = _ref.rows;

              if (!(rows.length < 1)) {
                _context2.next = 9;
                break;
              }

              return _context2.abrupt("return", res.status(404).json({
                status: 404,
                message: 'No Car Record Found. Try again Later'
              }));

            case 9:
              return _context2.abrupt("return", res.status(200).json({
                status: 200,
                data: rows
              }));

            case 10:
              _context2.next = 15;
              break;

            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", res.status(_context2.t0.statusCode || 500).json(_context2.t0.message));

            case 15:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 12]]);
    }));

    function getAllCars(_x3, _x4) {
      return _getAllCars.apply(this, arguments);
    }

    return getAllCars;
  }(),
  getAllUnsoldCars: function () {
    var _getAllUnsoldCars = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(req, res) {
      var _ref2, rows;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _car["default"].getAllUnsoldCars();

            case 3:
              _ref2 = _context3.sent;
              rows = _ref2.rows;

              if (!(rows.length < 1)) {
                _context3.next = 9;
                break;
              }

              return _context3.abrupt("return", res.status(404).json({
                status: 404,
                message: 'No cars available now. Try again later'
              }));

            case 9:
              return _context3.abrupt("return", res.status(200).json({
                status: 200,
                data: rows[0]
              }));

            case 10:
              _context3.next = 15;
              break;

            case 12:
              _context3.prev = 12;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", res.status(_context3.t0.statusCode || 500).json(_context3.t0.message));

            case 15:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 12]]);
    }));

    function getAllUnsoldCars(_x5, _x6) {
      return _getAllUnsoldCars.apply(this, arguments);
    }

    return getAllUnsoldCars;
  }(),
  getCarByProp: function () {
    var _getCarByProp = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(req, res) {
      var param, cardata;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              param = Object.keys(req.params)[0];
              _context4.t0 = param.toLowerCase();
              _context4.next = _context4.t0 === 'manufacturer' ? 5 : _context4.t0 === 'model' ? 9 : _context4.t0 === 'year' ? 13 : _context4.t0 === 'body_type' ? 17 : _context4.t0 === 'status' ? 21 : 25;
              break;

            case 5:
              _context4.next = 7;
              return _car["default"].getCarByProp(req.query.status, param, req.params.manufacturer);

            case 7:
              cardata = _context4.sent;
              return _context4.abrupt("break", 29);

            case 9:
              _context4.next = 11;
              return _car["default"].getCarByProp(req.query.status, param, req.params.model);

            case 11:
              cardata = _context4.sent;
              return _context4.abrupt("break", 29);

            case 13:
              _context4.next = 15;
              return _car["default"].getCarByProp(req.query.status, param, req.params.year);

            case 15:
              cardata = _context4.sent;
              return _context4.abrupt("break", 29);

            case 17:
              _context4.next = 19;
              return _car["default"].getCarByProp(req.query.status, param, req.params.body_type);

            case 19:
              cardata = _context4.sent;
              return _context4.abrupt("break", 29);

            case 21:
              _context4.next = 23;
              return _car["default"].getCarByProp(req.query.status, param, req.params.status);

            case 23:
              cardata = _context4.sent;
              return _context4.abrupt("break", 29);

            case 25:
              _context4.next = 27;
              return _car["default"].getCarByProp(req.query.status, param, req.params.state);

            case 27:
              cardata = _context4.sent;
              return _context4.abrupt("break", 29);

            case 29:
              if (!(cardata.rows.length < 1)) {
                _context4.next = 31;
                break;
              }

              return _context4.abrupt("return", res.status(404).json({
                status: 404,
                error: "There are no cars for the selected ".concat(param)
              }));

            case 31:
              return _context4.abrupt("return", res.status(200).json({
                status: 200,
                data: cardata.rows
              }));

            case 34:
              _context4.prev = 34;
              _context4.t1 = _context4["catch"](0);
              return _context4.abrupt("return", res.status(_context4.t1.statusCode || 500).json(_context4.t1.message));

            case 37:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 34]]);
    }));

    function getCarByProp(_x7, _x8) {
      return _getCarByProp.apply(this, arguments);
    }

    return getCarByProp;
  }(),
  updateCarAd: function () {
    var _updateCarAd = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(req, res) {
      var car_id, user_id, _ref3, rows, _carAd, carAd;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              car_id = req.params.car_id;
              user_id = req.body.user_id;
              _context5.next = 5;
              return _car["default"].findCarAd(parseInt(car_id, 10));

            case 5:
              _ref3 = _context5.sent;
              rows = _ref3.rows;

              if (!(rows.length < 1)) {
                _context5.next = 9;
                break;
              }

              return _context5.abrupt("return", res.status(404).json({
                status: 404,
                message: 'The advert to update is not available'
              }));

            case 9:
              if (!(!req.body.status || !req.body.price)) {
                _context5.next = 11;
                break;
              }

              return _context5.abrupt("return", res.status(400).json({
                status: 400,
                message: 'price and status are required'
              }));

            case 11:
              if (!req.body.price) {
                _context5.next = 15;
                break;
              }

              _context5.next = 14;
              return _car["default"].updateCarAd('price', req.body.price, parseInt(rows[0].car_id, 10));

            case 14:
              _carAd = _context5.sent;

            case 15:
              _context5.next = 17;
              return _car["default"].updateCarAd('status', req.body.status, parseInt(rows[0].car_id, 10));

            case 17:
              carAd = _context5.sent;

              if (carAd) {
                _context5.next = 22;
                break;
              }

              return _context5.abrupt("return", res.status(404).json({
                status: 404,
                message: 'The car ad was not found'
              }));

            case 22:
              return _context5.abrupt("return", res.status(200).json({
                status: 200,
                data: carAd.rows[0]
              }));

            case 23:
              _context5.next = 28;
              break;

            case 25:
              _context5.prev = 25;
              _context5.t0 = _context5["catch"](0);
              return _context5.abrupt("return", res.status(_context5.t0.statusCode || 500).json(_context5.t0.message));

            case 28:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 25]]);
    }));

    function updateCarAd(_x9, _x10) {
      return _updateCarAd.apply(this, arguments);
    }

    return updateCarAd;
  }(),
  getCarPriceRange: function () {
    var _getCarPriceRange = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6(req, res) {
      var min, max, _ref4, rows;

      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              //const min = req.query['min'];
              min = req.query.min ? req.query.min : 0; //const max = req.query['max'];

              max = req.query.max ? req.query.max : 5000000;
              _context6.prev = 2;
              _context6.next = 5;
              return _car["default"].getCarPriceRange(req.query.status, min, max);

            case 5:
              _ref4 = _context6.sent;
              rows = _ref4.rows;
              console.log(rows);

              if (!(rows.length < 1)) {
                _context6.next = 12;
                break;
              }

              return _context6.abrupt("return", res.status(404).json({
                status: 404,
                message: 'There are no cars within the selected price range'
              }));

            case 12:
              return _context6.abrupt("return", res.status(200).json({
                status: 200,
                data: rows
              }));

            case 13:
              _context6.next = 18;
              break;

            case 15:
              _context6.prev = 15;
              _context6.t0 = _context6["catch"](2);
              return _context6.abrupt("return", res.status(_context6.t0.statusCode || 500).json(_context6.t0.message));

            case 18:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[2, 15]]);
    }));

    function getCarPriceRange(_x11, _x12) {
      return _getCarPriceRange.apply(this, arguments);
    }

    return getCarPriceRange;
  }(),
  findCarAd: function () {
    var _findCarAd = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7(req, res) {
      var car_id, _ref5, rows;

      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              car_id = req.params.car_id;

              if (!Number.isNaN(car_id)) {
                _context7.next = 3;
                break;
              }

              return _context7.abrupt("return", res.status(400).json({
                status: 400,
                message: 'car id must be a number'
              }));

            case 3:
              if (!(car_id >= 10000)) {
                _context7.next = 5;
                break;
              }

              return _context7.abrupt("return", res.status(400).json({
                status: 400,
                message: 'Invalid Car ad Record. id cannot be greater than 10000'
              }));

            case 5:
              _context7.prev = 5;
              _context7.next = 8;
              return _car["default"].findCarAd(car_id);

            case 8:
              _ref5 = _context7.sent;
              rows = _ref5.rows;

              if (!(rows.length < 1)) {
                _context7.next = 12;
                break;
              }

              return _context7.abrupt("return", res.status(404).json({
                status: 404,
                error: 'No Car Record Found'
              }));

            case 12:
              return _context7.abrupt("return", res.status(200).json({
                status: 200,
                data: rows[0]
              }));

            case 15:
              _context7.prev = 15;
              _context7.t0 = _context7["catch"](5);
              return _context7.abrupt("return", res.status(_context7.t0.statusCode || 500).json(_context7.t0.message));

            case 18:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[5, 15]]);
    }));

    function findCarAd(_x13, _x14) {
      return _findCarAd.apply(this, arguments);
    }

    return findCarAd;
  }(),
  deleteCar: function () {
    var _deleteCar = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8(req, res) {
      var _ref6, rows, deleteAd;

      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;

              if (!(!req.params.car_id >= 10000)) {
                _context8.next = 3;
                break;
              }

              return _context8.abrupt("return", res.status(400).json({
                status: 400,
                message: 'Invalid car Id'
              }));

            case 3:
              _context8.next = 5;
              return _car["default"].findCarAd(parseInt(req.params.car_id));

            case 5:
              _ref6 = _context8.sent;
              rows = _ref6.rows;

              if (!(rows.length < 1)) {
                _context8.next = 9;
                break;
              }

              return _context8.abrupt("return", res.status(404).json({
                status: 404,
                message: 'This ad is not available'
              }));

            case 9:
              _context8.next = 11;
              return _car["default"].deleteCar(parseInt(req.params.car_id));

            case 11:
              deleteAd = _context8.sent;

              if (deleteAd) {
                _context8.next = 14;
                break;
              }

              return _context8.abrupt("return", res.status(404).json({
                status: 404,
                message: 'Error processing the request'
              }));

            case 14:
              res.status(200).json({
                status: 200,
                message: 'Ad has been succesfully deleted',
                data: deleteAd.rows[0]
              });
              _context8.next = 20;
              break;

            case 17:
              _context8.prev = 17;
              _context8.t0 = _context8["catch"](0);
              return _context8.abrupt("return", res.status(_context8.t0.statusCode || 500).json(_context8.t0.message));

            case 20:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, null, [[0, 17]]);
    }));

    function deleteCar(_x15, _x16) {
      return _deleteCar.apply(this, arguments);
    }

    return deleteCar;
  }()
};
var _default = CarAds;
exports["default"] = _default;