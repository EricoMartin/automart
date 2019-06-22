"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.allOrders = exports.updatePrice = exports.createOrder = void 0;
var allOrders = [];
exports.allOrders = allOrders;
var data = null;

var createOrder = function createOrder(data) {
  if (!data) {
    throw new Error('Please enter an order');
  }

  var id = parseInt(allOrders.length);
  var orderData = {
    id: id,
    buyer: data.buyer,
    carId: data.carId,
    price: data.price,
    created_on: new Date().toISOString(),
    status: 'pending'
  };
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