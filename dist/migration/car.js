"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _queries = _interopRequireDefault(require("./queries"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var newCar = {
  newCarAd: function newCarAd(data) {
    var createCar = "INSERT INTO cars (manufacturer, model, price, state, status, body_type, year, created_on, owner, img) VALUES ( ".concat(data.manufacturer, ", ").concat(data.model, "),\n            ").concat(data.price, ", ").concat(data.state, ", ").concat(data.status, ", ").concat(data.body_type, ", ").concat(data.year, ", ").concat(data.created_on, ", ").concat(data.owner, "), ").concat(data.img, ") RETURNING *");
    return _queries["default"].query(createCar, data);
  },
  getAllCars: function getAllCars() {
    var allCars = " SELECT * FROM cars";
    return _queries["default"].query(allCars);
  },
  findCarAd: function findCarAd(car_id) {
    var aCar = 'SELECT * FROM cars WHERE car_id=$1';
    return _queries["default"].query(aCar, [car_id]);
  },
  getAllUnsoldCars: function getAllUnsoldCars(status) {
    var allUnsoldCars = 'SELECT car_id, manufacturer, model, price, state, status, body_type, year, created_on, owner, img FROM cars WHERE status=$1';
    return _queries["default"].query(allUnsoldCars, [status]);
  },
  getCarPriceRange: function getCarPriceRange(status, min, max) {
    var range = 'SELECT car_id, manufacturer, model, price, state, status, body_type, year, created_on, owner, img FROM cars where status=$1 AND price BETWEEN $2 AND $3';
    return _queries["default"].query(range, [status, min, max]);
  },
  getCarByProp: function getCarByProp(status, param, props) {
    var prop = "SELECT car_id, manufacturer, model, price, state, status, body_type, year, created_on, owner, img FROM cars where status=$1 AND ".concat(reqParam, "=$2 LIMIT 100");
    return db.query(prop, [status, props]);
  },
  updateCarAd: function updateCarAd(prop, value, car_id) {
    var props = "UPDATE cars SET ".concat(prop, "=$1 WHERE car_id,=$2 RETURNING *");
    return _queries["default"].query(props, [value, car_id]);
  },
  deleteCar: function deleteCar(car_id) {
    var del = 'DELETE FROM cars WHERE car_id,=$1 RETURNING *';
    return _queries["default"].query(del, [car_id]);
  }
};
var _default = newCar;
exports["default"] = _default;