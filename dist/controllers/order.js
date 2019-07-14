"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _order = _interopRequireDefault(require("../models/order"));

var _car = _interopRequireDefault(require("../models/car"));

var _ErrorClass = _interopRequireDefault(require("../helpers/ErrorClass"));

var _SuccessClass = _interopRequireDefault(require("../helpers/SuccessClass"));

var _cars = _interopRequireDefault(require("../test/mock_db/cars"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Order =
/*#__PURE__*/
function () {
  function Order() {
    _classCallCheck(this, Order);
  }

  _createClass(Order, null, [{
    key: "createOrder",
    value: function createOrder(req, res) {
      try {
        req.body.buyerId = req.userId;
        var _req$body = req.body,
            carId = _req$body.carId,
            priceOffered = _req$body.priceOffered;
        carId = parseInt(carId, 10);
        var price = parseFloat(_cars["default"].indexOf(carId).price);
        priceOffered = parseFloat(priceOffered);

        var createdOrder = _order["default"].createOrder({
          buyer_id: req.body.buyerId,
          owner_id: _cars["default"][carId].owner,
          carId: carId,
          price: price,
          priceOffered: priceOffered
        });

        return res.status(201).json({
          status: 201,
          data: {
            id: createdOrder.id,
            car_id: createdOrder.carId,
            buyer_id: createdOrder.buyer_id,
            owner_id: createdOrder.owner_id,
            created_on: createdOrder.createdOn,
            status: createdOrder.status,
            price: createdOrder.price,
            priceOffered: createdOrder.priceOffered
          }
        });
      } catch (error) {
        res.status(error.statusCode || 500).json(error.message);
      }
    }
  }, {
    key: "updatePrice",
    value: function updatePrice(req, res) {
      var requiredParams = ['orderId', 'newPrice'];

      var order = _order["default"].getOrder(req.body.orderId);

      if (!order || order.status.toLowerCase() !== 'pending') {
        return new _ErrorClass["default"](404, 'Check that the order is still pending');
      }

      var buyer = req.userId;

      if (parseInt(buyer, 10) !== parseInt(order.buyerId, 10)) {
        return new _ErrorClass["default"](403, 'You dont have the permission to modify this order');
      }

      if (parseFloat(req.body.newPrice) === parseFloat(order.priceOffered)) {
        return new _ErrorClass["default"](400, 'The new offered price and the old are the same');
      }

      var updatedPriceOrder = _order["default"].updateOrderPrice(req.body.orderId, req.body.newPrice);

      return new _SuccessClass["default"](res, 200, updatedPriceOrder);
    }
  }, {
    key: "getAllOrders",
    value: function getAllOrders(req, res) {
      var orders = _order["default"].getAllOrders();

      if (orders < 1) {
        return new _ErrorClass["default"](404, 'There are no available orders.');
      }

      return new _SuccessClass["default"](res, 200, orders);
    }
  }, {
    key: "getAnOrder",
    value: function getAnOrder(req, res) {
      var order = _order["default"].getAnOrder(req.params.orderId);

      if (!order) {
        return new _ErrorClass["default"](404, 'Order not found');
      }

      var requester = parseInt(req.userId, 10);

      if (requester !== parseInt(order.ownerId, 10) && requester !== parseInt(order.buyerId, 10) && !req.role) {
        return new _ErrorClass["default"](403, 'You not authorized to view this order');
      }

      return new _SuccessClass["default"](res, 200, order);
    }
  }, {
    key: "deleteAnOrder",
    value: function deleteAnOrder(req, res) {
      var order = _order["default"].getOrder(req.params.orderId);

      if (!order) {
        return new _ErrorClass["default"](404, 'The order does not exist');
      }

      var seller = parseInt(order.ownerId, 10); // seller can deleted a cancelled order

      var requester = parseInt(req.userId, 10);

      if (requester !== seller && !req.role) {
        return new _ErrorClass["default"](403, 'You dont have permission to delete this resource');
      }

      if (order.status.toLowerCase() !== 'cancelled' && requester === seller) {
        return new _ErrorClass["default"](res, 400, 'You cannot delete an incomplete transaction');
      }

      var deletedOrder = _order["default"].deleteOrder(order);

      return new _SuccessClass["default"](res, 200, deletedOrder[0]);
    }
  }]);

  return Order;
}();

var _default = Order;
exports["default"] = _default;