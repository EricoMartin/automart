"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var allCarAds = [];
var data = null;

var createCarAd = function createCarAd(data) {
  if (!data) {
    throw new Error('Please enter car details');
  }

  var id = parseInt(allCarAds.length, 10);

  var cars = _objectSpread({
    id: id
  }, data, {
    createdOn: new Date().toISOString(),
    status: 'available'
  });

  allCarAds.push(cars);
  return cars;
};

var findAd = function findAd(id) {
  allCarAds.find(function (carAd) {
    return carAd.id === id;
  });
};

var updateStatus = function updateStatus(id, data) {
  var carAd = findAd(id);
  carAd.status = data;
  return carAd;
};

var updateCarAdPrice = function updateCarAdPrice(id, data) {
  var carAd = findAd(id);
  carAd.price = parseFloat(data);
  return carAd;
};

var _default = {
  allCarAds: allCarAds,
  createCarAd: createCarAd,
  updateStatus: updateStatus,
  updateCarAdPrice: updateCarAdPrice
};
exports["default"] = _default;