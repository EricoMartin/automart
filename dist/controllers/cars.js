"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var _fancyLog = _interopRequireDefault(require("fancy-log"));

var _model2 = _interopRequireDefault(require("../models/model/model"));

require("regenerator-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
  * @description - creates a new car
   * @params {object}
   * @returns {object}
   */
_cloudinary["default"].v2.config({
  cloud_name: process.env.ClOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

var cars = _model2["default"].cars;

var CarAds =
/*#__PURE__*/
function () {
  function CarAds() {
    _classCallCheck(this, CarAds);
  }

  _createClass(CarAds, null, [{
    key: "createAd",
    value: function () {
      var _createAd = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var _req$body, manufacturer, _model, price, state, year, bodyType, _req$authData$user, id, email, owner, multipleUpload, imgUrl, adsData;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                // Request body
                _req$body = req.body, manufacturer = _req$body.manufacturer, _model = _req$body.model, price = _req$body.price, state = _req$body.state, year = _req$body.year, bodyType = _req$body.bodyType; // Format Inputs

                _req$authData$user = req.authData.user, id = _req$authData$user.id, email = _req$authData$user.email;
                owner = id;
                manufacturer = manufacturer.trim().replace(/\s+/g, '');
                _model = _model.trim().replace(/\s+/g, '');
                price = parseFloat(price);
                state = state.trim().replace(/\s+/g, '');
                year = parseInt(year, 10);
                bodyType = bodyType.trim().replace(/\s+/g, ''); // Create a promise

                multipleUpload = new Promise(function (resolve, reject) {
                  var imageUrl = [];

                  if (req.files.image.length > 1) {
                    req.files.image.forEach(function (x) {
                      _cloudinary["default"].v2.uploader.upload(x.path, function (error, result) {
                        if (result) imageUrl.push(result.url);

                        if (imageUrl.length === req.files.image.length) {
                          resolve(imageUrl);
                        } else if (error) {
                          _fancyLog["default"].warn(error);

                          reject(error);
                        }
                      });
                    });
                  }
                }).then(function (result) {
                  return result;
                })["catch"](function (error) {
                  return error;
                }); // Wait for promise to be resolved

                _context.next = 13;
                return multipleUpload;

              case 13:
                imgUrl = _context.sent;

                if (!(imgUrl.code || imgUrl.errno)) {
                  _context.next = 16;
                  break;
                }

                return _context.abrupt("return", res.status(500).json({
                  status: 500,
                  error: imgUrl
                }));

              case 16:
                // Create Data
                adsData = cars.createCarAd({
                  owner: owner,
                  email: email,
                  manufacturer: manufacturer,
                  model: _model,
                  price: price,
                  state: state,
                  year: year,
                  bodyType: bodyType,
                  imgUrl: imgUrl
                });
                return _context.abrupt("return", res.status(201).json({
                  status: 201,
                  data: {
                    id: adsData.id,
                    owner: adsData.owner,
                    email: adsData.email,
                    created_on: adsData.createdOn,
                    manufacturer: adsData.manufacturer,
                    model: adsData.model,
                    price: adsData.price,
                    state: adsData.state,
                    status: adsData.status,
                    year: adsData.year,
                    body_type: adsData.bodyType,
                    images: adsData.imgUrl
                  }
                }));

              case 20:
                _context.prev = 20;
                _context.t0 = _context["catch"](0);
                res.status(_context.t0.statusCode || 500).json(_context.t0.message);

              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 20]]);
      }));

      function createAd(_x, _x2) {
        return _createAd.apply(this, arguments);
      }

      return createAd;
    }()
  }, {
    key: "updateStatus",
    value: function updateStatus(req, res) {
      try {
        var id = parseInt(req.params.id, 10);
        var updatedAd = cars.updateStatus(id, req.body.status.trim());
        return res.status(200).json({
          status: 200,
          data: {
            id: updatedAd.id,
            email: updatedAd.email,
            created_on: updatedAd.createdOn,
            manufacturer: updatedAd.manufacturer,
            model: updatedAd.model,
            price: updatedAd.price,
            state: updatedAd.state,
            status: updatedAd.status,
            year: updatedAd.year,
            body_type: updatedAd.bodyType
          }
        });
      } catch (error) {
        return res.status(error.statusCode || 500).json(error.message);
      }
    }
  }, {
    key: "updateCarPrice",
    value: function updateCarPrice(req, res) {
      try {
        var id = parseInt(req.params.id, 10);
        var updatedAd = cars.updateCarAdPrice(id, req.body.price);
        return res.status(200).json({
          status: 200,
          data: {
            id: updatedAd.id,
            email: updatedAd.email,
            created_on: updatedAd.createdOn,
            manufacturer: updatedAd.manufacturer,
            model: updatedAd.model,
            price: updatedAd.price,
            state: updatedAd.state,
            status: updatedAd.status,
            year: updatedAd.year,
            body_type: updatedAd.bodyType
          }
        });
      } catch (error) {
        res.status(error.statusCode || 500).json(error.message);
      }
    }
  }, {
    key: "find",
    value: function find(req, res) {
      try {
        var query = req.query;

        if (query.status && query.min_price && query.max_price) {
          // eslint-disable-next-line max-len
          var filtered = cars.allCarsAds.filter(function (x) {
            return x.status === query.status && x.price > query.min_price && x.price < query.max_price;
          });

          if (filtered.length === 0) {
            return res.status(200).json({
              status: 200,
              data: 'No record found'
            });
          }

          return res.status(200).json({
            status: 200,
            data: filtered
          });
        }

        if (query.status && query.manufacturer) {
          // eslint-disable-next-line max-len
          var _filtered = cars.allCarsAds.filter(function (x) {
            return x.status === query.status && x.manufacturer === query.manufacturer;
          });

          if (_filtered.length === 0) {
            return res.status(200).json({
              status: 200,
              data: 'No record found'
            });
          }

          return res.status(200).json({
            status: 200,
            data: _filtered
          });
        }

        if (query.status && query.bodyType) {
          // eslint-disable-next-line max-len
          var _filtered2 = cars.allCarsAds.filter(function (x) {
            return x.status === query.status && x.bodyType === query.bodyType;
          });

          if (_filtered2.length === 0) {
            return res.status(200).json({
              status: 200,
              data: 'No record found'
            });
          }

          return res.status(200).json({
            status: 200,
            data: _filtered2
          });
        }

        if (query.status && query.state) {
          // eslint-disable-next-line max-len
          var _filtered3 = cars.allCarsAds.filter(function (x) {
            return x.status === query.status && x.state === query.state;
          });

          if (_filtered3.length === 0) {
            return res.status(200).json({
              status: 200,
              data: 'No record found'
            });
          }

          return res.status(200).json({
            status: 200,
            data: _filtered3
          });
        }

        if (query.status) {
          var _filtered4 = cars.allCarsAds.filter(function (carAd) {
            return carAd.status === req.query.status;
          });

          if (_filtered4.length === 0) {
            return res.status(200).json({
              status: 200,
              data: 'No record found'
            });
          }

          return res.status(200).json({
            status: 200,
            data: _filtered4
          });
        }

        var allAds = cars.allCarsAds;
        return res.status(200).json({
          status: 200,
          data: allAds
        });
      } catch (error) {
        res.status(error.statusCode || 500).json(error.message);
      }
    }
  }, {
    key: "findSpecificCar",
    value: function findSpecificCar(req, res) {
      try {
        var id = parseInt(req.params.id, 10);
        var carAd = cars.allCarsAds.find(function (car) {
          return car.id === id;
        });

        if (carAd === undefined) {
          return res.status(200).json({
            status: 200,
            data: 'No record found'
          });
        }

        return res.status(200).json({
          status: 200,
          data: {
            id: carAd.id,
            owner: carAd.owner,
            email: carAd.email,
            created_on: carAd.createdOn,
            manufacturer: carAd.manufacturer,
            model: carAd.model,
            price: carAd.price,
            state: carAd.state,
            status: carAd.status,
            year: carAd.year,
            body_type: carAd.bodyType,
            images: carAd.imgUrl
          }
        });
      } catch (error) {
        res.status(error.statusCode || 500).json(error.message);
      }
    }
  }, {
    key: "deleteAd",
    value: function deleteAd(req, res) {
      try {
        var users = req.authData.users;

        if (users.isAdmin === true) {
          var id = parseInt(req.params.id, 10);
          var adIndex = cars.allCarsAds.findIndex(function (x) {
            return x.id === id;
          });

          if (adIndex === parseInt('-1', 10)) {
            return res.status(200).json({
              status: 200,
              data: 'No record found'
            });
          }

          cars.allCarsAds.splice(adIndex, 0);
          return res.status(200).json({
            status: 200,
            data: 'Car Ad successfully deleted'
          });
        }

        return res.status(403).json({
          status: 403,
          error: 'Forbidden: Only Admin can delete an AD'
        });
      } catch (error) {
        res.status(error.statusCode || 500).json(error.message);
      }
    }
  }]);

  return CarAds;
}();

var _default = CarAds;
exports["default"] = _default;