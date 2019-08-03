"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _cars = _interopRequireDefault(require("../test/mock_db/cars"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Car =
/*#__PURE__*/
function () {
  function Car() {
    _classCallCheck(this, Car);

    this.cars = _cars["default"];
  }

  _createClass(Car, [{
    key: "newCarAd",
    value: function newCarAd(data) {
      var id = parseInt(_cars["default"].length + 1, 10);
      var carData = {
        id: id,
        owner_id: data.owner || '',
        created_on: new Date().toLocaleString(),
        state: data.state || '',
        status: data.status || 'available',
        price: data.price || 0,
        manufacturer: data.manufacturer || '',
        year: data.year || '',
        model: data.model || '',
        body_type: data.body_type || '',
        img: data.img || ''
      };
      this.cars.push(carData);
      return carData;
    }
  }, {
    key: "getAllCars",
    value: function getAllCars() {
      return this.cars;
    }
  }, {
    key: "findCarAd",
    value: function findCarAd(id) {
      return this.cars.find(function (car) {
        return parseInt(car.id, 10) === parseInt(id, 10);
      }) || [];
    }
  }, {
    key: "getAllUnsoldCars",
    value: function getAllUnsoldCars() {
      return this.cars.filter(function (car) {
        return car.status === 'available';
      });
    }
  }, {
    key: "getCarByProp",
    value: function getCarByProp(props, value) {
      return this.cars.filter(function (car) {
        return car[props].toLowerCase() === value.toLowerCase();
      });
    }
  }, {
    key: "getUnsoldCarByProp",
    value: function getUnsoldCarByProp(props, value) {
      return this.cars.filter(function (car) {
        return car.status.toLowerCase() === 'available' && car[props].toLowerCase() === value.toLowerCase();
      });
    }
  }, {
    key: "updateStatus",
    value: function updateStatus(id, data) {
      var carAd = this.cars.find(function (car) {
        return parseInt(car.id, 10) === parseInt(id, 10);
      });
      carAd.status = data.status || carAd.status;
      return carAd;
    }
  }, {
    key: "updateCarAdPrice",
    value: function updateCarAdPrice(id, data) {
      var carAd = this.cars.find(function (car) {
        return parseInt(car.id, 10) === parseInt(id, 10);
      });
      carAd.price = parseInt(data.price, 10) || carAd.price;
      return carAd;
    }
  }, {
    key: "getCarPriceRange",
    value: function getCarPriceRange(min, max) {
      return this.cars.filter(function (car) {
        return car.status.toLowerCase() === 'available' && parseInt(car.price, 10) >= parseInt(min, 10) && parseInt(car.price, 10) <= parseInt(max, 10);
      });
    }
  }, {
    key: "deleteCar",
    value: function deleteCar(car) {
      var idx = this.cars.indexOf(car);
      return this.cars.splice(idx, 1);
    }
  }]);

  return Car;
}();

var _default = new Car();

exports["default"] = _default;