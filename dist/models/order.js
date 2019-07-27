"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _orders = _interopRequireDefault(require("../test/mock_db/orders"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createOrder = function createOrder(data) {
  var orderdata = {
    id: parseInt(_orders["default"].length + 1, 10),
    car_id: data.car_id,
    buyer_id: data.buyer_id,
    owner_id: data.owner_id,
    created_on: new Date().toLocaleString(),
    price: data.price || 0,
    status: 'rejected' || 'pending' || 'accepted',
    body_type: data.body_type || '',
    price_offered: data.price_offered || ''
  };

  _orders["default"].push(orderdata);

  return orderdata;
};

var getAllOrders = function getAllOrders() {
  return _orders["default"];
};

var getAnOrder = function getAnOrder(id) {
  return _orders["default"].find(function (order) {
    return parseInt(order.id, 10) === parseInt(id, 10);
  });
};

var updateOrderPrice = function updateOrderPrice(order_id, price) {
  var order = _orders["default"].getAnOrder(order_id);

  order.price_offered = parseFloat(price);
  return order;
};

var updateOrder = function updateOrder(id, orderStatus) {
  var update = _orders["default"].find(function (order) {
    return order.id === id;
  });

  update.status = orderStatus;
  return update;
};

var deleteOrder = function deleteOrder(id) {
  var idx = _orders["default"].indexOf(id);

  return _orders["default"].splice(idx, 1);
};

var _default = {
  createOrder: createOrder,
  getAllOrders: getAllOrders,
  getAnOrder: getAnOrder,
  updateOrderPrice: updateOrderPrice,
  updateOrder: updateOrder,
  deleteOrder: deleteOrder
};
exports["default"] = _default;