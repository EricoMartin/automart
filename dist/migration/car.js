"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _queries = _interopRequireDefault(require("./queries"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var newCar = {
  newCarAd: function newCarAd(data) {
    var createCar = "INSERT INTO cars (manufacturer, model, price, state, status, body_type, year, created_on, owner, img) VALUES ( $1, $2,\n            $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *";
    return _queries["default"].query(createCar, data);
  },
  getAllCars: function getAllCars() {
    var allCars = 'SELECT * FROM cars';
    return _queries["default"].query(allCars);
  },
  findCarAd: function findCarAd(car_id) {
    var aCar = 'SELECT * FROM cars WHERE car_id=$1';
    return _queries["default"].query(aCar, [car_id]);
  },
  getAllUnsoldCars: function getAllUnsoldCars() {
    var allUnsoldCars = "SELECT car_id, manufacturer, model, price, state, status, body_type, year, created_on, owner, img FROM cars where status='available'";
    return _queries["default"].query(allUnsoldCars);
  },
  getCarPriceRange: function getCarPriceRange(status, min, max) {
    var range = 'SELECT car_id, manufacturer, model, price, state, status, body_type, year, created_on, owner, img FROM cars where status=$1 AND price BETWEEN $2 AND $3';
    return _queries["default"].query(range, [min, max]);
  },
  getCarByProp: function getCarByProp(status, param, props) {
    var prop = "SELECT car_id, manufacturer, model, price, state, status, body_type, year, created_on, owner, img FROM cars where status=$1 AND ".concat(param, "=$2 LIMIT 30");
    return _queries["default"].query(prop, [status, props]);
  },
  updateCarAd: function updateCarAd(prop, value, car_id) {
    var props = "UPDATE cars SET ".concat(prop, "=$1 WHERE car_id=$2 RETURNING *");
    return _queries["default"].query(props, [value, car_id]);
  },
  deleteCar: function deleteCar(car_id) {
    var del = 'DELETE FROM cars WHERE car_id=$1 RETURNING *';
    return _queries["default"].query(del, [car_id]);
  }
};
var _default = newCar;
exports["default"] = _default;