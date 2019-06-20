"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _model = _interopRequireDefault(require("../models/model/model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Orders = _model["default"].Orders;
/*
  * @description - creates a new order
   * @params {object}
   * @returns {object}
   */

var Order =
/*#__PURE__*/
function () {
  function Order() {
    _classCallCheck(this, Order);
  }

  _createClass(Order, null, [{
    key: "makeOrder",
    value: function makeOrder(req, res) {
      var _req$body = req.body,
          carId = _req$body.carId,
          price = _req$body.price,
          priceOffered = _req$body.priceOffered;
      carId = parseInt(carId, 10);
      price = parseFloat(price);
      priceOffered = parseFloat(priceOffered);
      var createdOrder = Orders.createOrder({
        carId: carId,
        price: price,
        priceOffered: priceOffered
      });
      return res.status(201).json({
        status: 201,
        data: {
          id: createdOrder.id,
          car_id: createdOrder.carId,
          created_on: createdOrder.created_on,
          status: createdOrder.status,
          price: createdOrder.price,
          priceOffered: createdOrder.priceOffered
        }
      });
    }
  }, {
    key: "updateOrder",
    value: function updateOrder(req, res) {
      var id = parseInt(req.params.id, 10);
      var updatedOrder = Orders.updatePrice(id, req.body.newPriceOffered);

      if (updatedOrder === undefined) {
        return res.status(200).json({
          status: 200,
          data: 'No record found'
        });
      }

      if (updatedOrder.status === 'accepted' || updatedOrder.status === 'rejected') {
        return res.status(400).json({
          status: 400,
          error: 'Cannot update price because order status is either accepted or rejected'
        });
      }

      return res.status(200).json({
        status: 200,
        data: {
          id: updatedOrder.id,
          car_id: updatedOrder.carId,
          status: updatedOrder.status,
          old_price_offered: updatedOrder.priceOffered,
          new_price_offered: updatedOrder.newPriceOffered
        }
      });
    }
  }]);

  return Order;
}();

var _default = Order;
exports["default"] = _default;