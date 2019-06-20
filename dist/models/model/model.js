"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _users = require("../users/users.js");

var _cars = require("../cars/cars.js");

var _orders = require("../orders/orders.js");

var _flags = require("../flags/flags.js");

var model = {
  users: {
    createUser: _users.createUser,
    findEmail: _users.findEmail,
    allUsers: _users.allUsers
  },
  cars: {
    allCarAds: _cars.allCarAds,
    createCarAd: _cars.createCarAd,
    updateStatus: _cars.updateStatus,
    updateCarAdPrice: _cars.updateCarAdPrice
  },
  orders: {
    createOrder: _orders.createOrder,
    updatePrice: _orders.updatePrice,
    allOrders: _orders.allOrders
  },
  flags: {
    createFlag: _flags.createFlag,
    allFlags: _flags.allFlags
  }
};
var _default = model;
exports["default"] = _default;