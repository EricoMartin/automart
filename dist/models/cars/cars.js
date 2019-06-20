"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var allCarAds = [];
var data = null;

var createCarAd = function createCarAd(data) {
  if (!data) {
    throw new Error('Please enter car details');
  }

  var id = parseInt(allCarAds.length, 10);
  var cars = {
    id: id,
    owner: null,
    createdOn: new Date().toISOString(),
    state: null,
    price: null,
    manufacturer: null,
    model: null,
    bodyType: null,
    status: 'available'
  };
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