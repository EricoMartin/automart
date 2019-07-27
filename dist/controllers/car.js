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

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
      var _req$body, manufacturer, owner, model, price, state, status, year, body_type, img, props, invalidData, _req$authData$user, id, email, imgUrl, newAd;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _req$body = req.body, manufacturer = _req$body.manufacturer, owner = _req$body.owner, model = _req$body.model, price = _req$body.price, state = _req$body.state, status = _req$body.status, year = _req$body.year, body_type = _req$body.body_type, img = _req$body.img;
              props = [manufacturer, model, price, state, status, year, body_type, img];

              invalidData = function invalidData(property, data) {
                return property.find(function (idx) {
                  return data[idx] === undefined || data[idx] === '';
                });
              };

              if (!(!invalidData(props, req.body) || !img)) {
                _context.next = 5;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                status: 400,
                message: 'Fill all required fields'
              }));

            case 5:
              _req$authData$user = req.authData.user, id = _req$authData$user.id, email = _req$authData$user.email;
              owner = id;
              manufacturer = manufacturer.trim().replace(/\s+/g, '');
              model = model.trim().replace(/\s+/g, '');
              price = parseInt(price);
              state = state.trim().replace(/\s+/g, '');
              status = status.trim().replace(/\s+/g, '');
              year = parseInt(year, 10);
              body_type = body_type.trim().replace(/\s+/g, '');
              img = img.trim().replace(/\s+/g, '');
              /*try {
                const imgprom = new Promise((resolve, reject) => {
                const imageUrl = [];
                if (req.files.image.length > 1) {
                  req.files.image.forEach((x) => {
                    cloudinary.uploader.upload(x.path, (error, result) => {
                      if (result) imageUrl.push(result.url);
                      if (imageUrl.length === req.files.image.length) {
                        resolve(imageUrl);
                      } else if (error) {
                        log.warn(error);
                        reject(error);
                      }
                    });
                  });
                }
              })
                .then(result => result)
                .catch(error => error);
                const imgUrl = await imgprom;
              if (imgUrl.code || imgUrl.errno) {
                return res.status(500).json({
                  status: 500,
                  error: imgUrl,
                });
              }
                if(!imgUrl){
                return res.status(400).json({
                  status: 400,
                  message: 'An image is required',
                });
              }*/

              _context.prev = 15;

              if (!req.file) {
                _context.next = 22;
                break;
              }

              _context.next = 19;
              return _cloudinary["default"].uploader.upload(req.file.path, {
                folder: 'automart-app/',
                format: 'jpg'
              });

            case 19:
              _context.t0 = _context.sent;
              _context.next = 23;
              break;

            case 22:
              _context.t0 = {
                url: req.img_url
              };

            case 23:
              imgUrl = _context.t0;
              newAd = _car["default"].newCarAd({
                id: id,
                owner: owner,
                state: state,
                status: status,
                price: price,
                manufacturer: manufacturer,
                year: year,
                model: model,
                body_type: body_type,
                img: imgUrl.url
              });
              return _context.abrupt("return", res.status(201).json({
                status: 201,
                data: newAd
              }));

            case 28:
              _context.prev = 28;
              _context.t1 = _context["catch"](15);
              return _context.abrupt("return", res.status(_context.t1.statusCode || 500).json(_context.t1.message));

            case 31:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[15, 28]]);
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
                data: rows
              }));

            case 10:
              _context3.next = 15;
              break;

            case 12:
              _context3.prev = 12;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", res.status(statusCode.message || 500).json(_context3.t0.message));

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
              _context4.next = _context4.t0 === 'manufacturer' ? 5 : _context4.t0 === 'model' ? 9 : _context4.t0 === 'year' ? 13 : _context4.t0 === 'body_type' ? 17 : _context4.t0 === 'status' ? 21 : _context4.t0 === 'price' ? 25 : 29;
              break;

            case 5:
              _context4.next = 7;
              return _car["default"].getCarByProp(req.query.status, param, req.params.manufacturer);

            case 7:
              cardata = _context4.sent;
              return _context4.abrupt("break", 33);

            case 9:
              _context4.next = 11;
              return _car["default"].getCarByProp(req.query.status, param, req.params.model);

            case 11:
              cardata = _context4.sent;
              return _context4.abrupt("break", 33);

            case 13:
              _context4.next = 15;
              return _car["default"].getCarByProp(req.query.status, param, req.params.year);

            case 15:
              cardata = _context4.sent;
              return _context4.abrupt("break", 33);

            case 17:
              _context4.next = 19;
              return _car["default"].getCarByProp(req.query.status, param, req.params.body_type);

            case 19:
              cardata = _context4.sent;
              return _context4.abrupt("break", 33);

            case 21:
              _context4.next = 23;
              return _car["default"].getCarByProp(req.query.status, param, req.params.status);

            case 23:
              cardata = _context4.sent;
              return _context4.abrupt("break", 33);

            case 25:
              _context4.next = 27;
              return _car["default"].getCarByProp(req.query.status, param, req.params.price);

            case 27:
              cardata = _context4.sent;
              return _context4.abrupt("break", 33);

            case 29:
              _context4.next = 31;
              return _car["default"].getCarByProp(req.query.status, param, req.params.state);

            case 31:
              cardata = _context4.sent;
              return _context4.abrupt("break", 33);

            case 33:
              if (!(cardata.length < 1)) {
                _context4.next = 35;
                break;
              }

              return _context4.abrupt("return", res.status(404).json({
                status: 404,
                message: "There are no cars for the selected ".concat(param)
              }));

            case 35:
              return _context4.abrupt("return", res.status(200).json({
                status: 200,
                data: cardata
              }));

            case 38:
              _context4.prev = 38;
              _context4.t1 = _context4["catch"](0);
              return _context4.abrupt("return", res.status(_context4.t1.statusCode || 500).json(_context4.t1.message));

            case 41:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 38]]);
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
      var car_id, card, carAd, carStatus;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              car_id = req.params;
              card = findCarAd(parseInt(car_id, 10));

              if (card) {
                _context5.next = 4;
                break;
              }

              return _context5.abrupt("return", res.status(404).json({
                status: 404,
                message: 'The advert to update is not available'
              }));

            case 4:
              if (!(card.owner !== req.body.owner)) {
                _context5.next = 6;
                break;
              }

              return _context5.abrupt("return", res.status(401).json({
                status: 401,
                message: 'You are not authorized to update Ad'
              }));

            case 6:
              if (!(!req.body.status || !req.body.price)) {
                _context5.next = 8;
                break;
              }

              return _context5.abrupt("return", res.status(400).json({
                status: 400,
                message: 'price and status are required'
              }));

            case 8:
              _context5.prev = 8;
              _context5.next = 11;
              return _car["default"].updateCarAd('status', req.body.status, car_id);

            case 11:
              carAd = _context5.sent;
              _context5.next = 14;
              return _car["default"].updateCarAd('price', req.body.price, car_id);

            case 14:
              carStatus = _context5.sent;

              if (!(!carAd || !carStatus)) {
                _context5.next = 19;
                break;
              }

              return _context5.abrupt("return", res.status(404).json({
                status: 404,
                message: 'The car ad was not found'
              }));

            case 19:
              return _context5.abrupt("return", res.status(200).json({
                status: 200,
                data: _objectSpread({}, carAd),
                info: carStatus
              }));

            case 20:
              _context5.next = 25;
              break;

            case 22:
              _context5.prev = 22;
              _context5.t0 = _context5["catch"](8);
              return _context5.abrupt("return", res.status(_context5.t0.statusCode || 500).json(_context5.t0.message));

            case 25:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[8, 22]]);
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
      var min, max, _ref3, rows;

      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              //const min = req.query['min'];
              min = req.query.min ? req.query.min : 0; //const max = req.query['max'];

              max = req.query.max ? req.query.max : 5000000; //min = min || 0;
              //max = max || 5000000;

              _context6.next = 4;
              return _car["default"].getCarPriceRange(req.query.status, min, max);

            case 4:
              _ref3 = _context6.sent;
              rows = _ref3.rows;

              if (!(rows.length < 1)) {
                _context6.next = 8;
                break;
              }

              return _context6.abrupt("return", res.status(404).json({
                status: 404,
                message: 'There are no cars within the selected price range'
              }));

            case 8:
              return _context6.abrupt("return", res.status(200).json({
                status: 200,
                data: rows
              }));

            case 9:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
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
      var id, _ref4, rows;

      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              id = req.params.id;

              if (!(id >= 10000)) {
                _context7.next = 3;
                break;
              }

              return _context7.abrupt("return", res.status(400).json({
                status: 400,
                message: 'Invalid Car ad Record. id cannot be greater than 10000'
              }));

            case 3:
              _context7.prev = 3;
              _context7.next = 6;
              return _car["default"].findCarAd(req.params.id);

            case 6:
              _ref4 = _context7.sent;
              rows = _ref4.rows;

              if (!(rows.length < 1)) {
                _context7.next = 10;
                break;
              }

              return _context7.abrupt("return", res.status(404).json({
                status: 404,
                message: 'No Car Record Found'
              }));

            case 10:
              return _context7.abrupt("return", res.status(200).json({
                status: 200,
                data: rows
              }));

            case 13:
              _context7.prev = 13;
              _context7.t0 = _context7["catch"](3);
              return _context7.abrupt("return", res.status(_context7.t0.statusCode || 500).json(_context7.t0.message));

            case 16:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[3, 13]]);
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
      var data, deleteAd;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;

              if (!(!req.params.car_id < 10000)) {
                _context8.next = 3;
                break;
              }

              return _context8.abrupt("return", res.status(400).json({
                status: 400,
                message: 'Invalid car Id'
              }));

            case 3:
              _context8.next = 5;
              return _car["default"].findCarAd(req.params.id);

            case 5:
              data = _context8.sent;

              if (data) {
                _context8.next = 8;
                break;
              }

              return _context8.abrupt("return", res.status(404).json({
                status: 404,
                message: 'This ad is not available'
              }));

            case 8:
              _context8.next = 10;
              return _car["default"].deleteCar(data);

            case 10:
              deleteAd = _context8.sent;

              if (deleteAd) {
                _context8.next = 13;
                break;
              }

              return _context8.abrupt("return", res.status(404).json({
                status: 404,
                message: 'Error processing the request'
              }));

            case 13:
              res.status(200).json({
                status: 200,
                data: 'Ad has been succesfully deleted'
              });
              _context8.next = 19;
              break;

            case 16:
              _context8.prev = 16;
              _context8.t0 = _context8["catch"](0);
              return _context8.abrupt("return", res.status(_context8.t0.statusCode || 500).json(_context8.t0.message));

            case 19:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, null, [[0, 16]]);
    }));

    function deleteCar(_x15, _x16) {
      return _deleteCar.apply(this, arguments);
    }

    return deleteCar;
  }()
};
var _default = CarAds;
exports["default"] = _default;