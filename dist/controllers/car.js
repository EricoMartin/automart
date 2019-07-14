"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _car = _interopRequireDefault(require("../models/car"));

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
      var _req$body, manufacturer, owner, model, price, state, status, year, body_type, img, props, invalidData, _req$authData$user, id, email, imgprom, imgUrl, newAd;

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
              _context.prev = 15;
              imgprom = new Promise(function (resolve, reject) {
                var imageUrl = [];

                if (req.files.image.length > 1) {
                  req.files.image.forEach(function (x) {
                    _cloudinary["default"].uploader.upload(x.path, function (error, result) {
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
              }).then(function (result) {
                return result;
              })["catch"](function (error) {
                return error;
              });
              _context.next = 19;
              return imgprom;

            case 19:
              imgUrl = _context.sent;

              if (!(imgUrl.code || imgUrl.errno)) {
                _context.next = 22;
                break;
              }

              return _context.abrupt("return", res.status(500).json({
                status: 500,
                error: imgUrl
              }));

            case 22:
              if (imgUrl) {
                _context.next = 24;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                status: 400,
                message: 'An image is required'
              }));

            case 24:
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
                img: img,
                imgUrl: imgUrl
              });
              return _context.abrupt("return", res.status(201).json({
                status: 201,
                data: newAd
              }));

            case 28:
              _context.prev = 28;
              _context.t0 = _context["catch"](15);
              return _context.abrupt("return", res.status(_context.t0.statusCode || 500).json(_context.t0.message));

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
  getAllCars: function getAllCars(req, res) {
    var data = _car["default"].getAllCars();

    if (data.length < 1) {
      return res.status(404).json({
        status: 404,
        message: 'No Car Record Found. Try again Later'
      });
    } else {
      return res.status(200).json({
        status: 200,
        data: data
      });
    }
  },
  getAllUnsoldCars: function getAllUnsoldCars(req, res) {
    var data = _car["default"].getAllUnsoldCars();

    if (data.length < 1) {
      return res.status(404).json({
        status: 404,
        message: 'No cars available now. Try again later'
      });
    } else {
      return res.status(200).json({
        status: 200,
        data: data
      });
    }
  },
  getCarByProp: function getCarByProp(req, res) {
    var param = Object.keys(req.params)[0];
    var cardata;

    switch (param.toLowerCase()) {
      case 'manufacturer':
        cardata = _car["default"].getUnsoldCarByProp(param, req.params.manufacturer);
        break;

      case 'model':
        cardata = _car["default"].getUnsoldCarByProp(param, req.params.model);
        break;

      case 'year':
        cardata = _car["default"].getUnsoldCarByProp(param, req.params.year);
        break;

      case 'body_type':
        cardata = _car["default"].getUnsoldCarByProp(param, req.params.body_type);
        break;

      case 'status':
        cardata = _car["default"].getUnsoldCarByProp(param, req.params.status);
        break;

      case 'price':
        cardata = _car["default"].getUnsoldCarByProp(param, req.params.price);
        break;

      default:
        cardata = _car["default"].getUnsoldCarByProp(param, req.params.state);
        break;
    }

    if (cardata.length < 1) {
      return res.status(404).json({
        status: 404,
        message: "There are no cars for the selected ".concat(param)
      });
    }

    return res.status(200).json({
      status: 200,
      data: cardata
    });
  },
  updateCarAd: function updateCarAd(req, res) {
    var carId = req.body.id;
    var card = findCarAd(parseInt(carId, 10));

    if (!card) {
      return res.status(404).json({
        status: 404,
        message: 'The advert to update is not available'
      });
    }

    if (card !== req.body.owner) {
      return res.status(401).json({
        status: 401,
        message: 'You are not authorized to update Ad'
      });
    }

    var carAd = _car["default"].updateCarAdPrice(req.body.id, req.body);

    var carStatus = _car["default"].updateStatus(req.body.id, req.body); //return (!carAd || !carStatus) ? new APIError(400, 'The car ad was not found') : APISuccess(res, 200, carAd);


    if (!carAd || !carStatus) {
      return res.status(404).json({
        status: 404,
        message: 'The car ad was not found'
      });
    } else {
      return res.status(200).json({
        status: 200,
        data: _objectSpread({}, carAd)
      });
    }
  },
  getCarPriceRange: function getCarPriceRange(req, res) {
    //const min = req.query['min'];
    var min = req.query.min ? req.query.min : 0; //const max = req.query['max'];

    var max = req.query.max ? req.query.max : 5000000; //min = min || 0;
    //max = max || 5000000;

    var cars = _car["default"].getCarPriceRange(min, max);

    if (cars.length === 0) {
      return res.status(404).json({
        status: 404,
        message: 'There are no cars within the selected price range'
      });
    }

    return res.status(200).json({
      status: 200,
      data: cars
    });
  },
  findCarAd: function findCarAd(req, res) {
    var id = req.params.id;

    if (id >= 10000) {
      return res.status(400).json({
        status: 400,
        message: 'Invalid Car ad Record. id cannot be greater than 10000'
      });
    }

    var carFound = _car["default"].findCarAd(id);

    if (carFound.length < 1) {
      return res.status(404).json({
        status: 404,
        message: 'No Car Record Found'
      });
    }

    return res.status(200).json({
      status: 200,
      data: {
        id: carFound.id,
        owner_id: carFound.owner_id,
        email: carFound.email,
        created_on: carFound.createdOn,
        manufacturer: carFound.manufacturer,
        model: carFound.model,
        price: carFound.price,
        state: carFound.state,
        status: carFound.status,
        year: carFound.year,
        body_type: carFound.body_type,
        img: carFound.imgUrl
      }
    });
  },
  deleteCar: function deleteCar(req, res) {
    var user = req.body;

    if (user.isAdmin === true) {
      var data = _car["default"].findCarAd(req.params.id);

      if (!data) {
        return res.status(404).json({
          status: 404,
          message: 'This ad is not available'
        });
      }

      var deleteAd = _car["default"].deleteCar(data);

      if (!deleteAd) {
        return res.status(404).json({
          status: 404,
          message: 'Error processing the request'
        });
      }

      res.status(200).json({
        status: 200,
        data: 'Ad has been succesfully deleted'
      });
    }
  }
};
var _default = CarAds;
exports["default"] = _default;