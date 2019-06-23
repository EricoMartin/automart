"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.allOrders = exports.updatePrice = exports.createOrder = void 0;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var allOrders = [];
exports.allOrders = allOrders;
var data = null;

var createOrder = function createOrder(data) {
  if (!data) {
    throw new Error('Please enter an order');
  }

  var id = parseInt(allOrders.length);

  var orderData = _objectSpread({
    id: id
  }, data, {
    created_on: new Date().toISOString(),
    status: 'pending'
  });

  allOrders.push(orderData);
  return orderData;
}; // Find one order


exports.createOrder = createOrder;

var findOneOrder = function findOneOrder(id) {
  return allOrders.find(function (order) {
    return order.id === id;
  });
};

var updatePrice = function updatePrice(id, data) {
  // Find the order
  var order = findOneOrder(id);

  if (order !== undefined) {
    if (order.status === 'pending') {
      order.newPriceOffered = parseFloat(data);
    }
  }

  return order;
};

exports.updatePrice = updatePrice;