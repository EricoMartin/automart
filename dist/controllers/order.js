"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _order = _interopRequireDefault(require("../migration/order"));

var _car = _interopRequireDefault(require("../models/car"));

var _cars = _interopRequireDefault(require("../test/mock_db/cars"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
    value: function () {
      var _createOrder = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var _req$body, car_id, buyer_id, price_offered, car, price, _ref, rows, owner_id, amount, values, createdOrder;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _req$body = req.body, car_id = _req$body.car_id, buyer_id = _req$body.buyer_id, price_offered = _req$body.price_offered;
                car = req.body.car_id;

                if (!(!car_id || buyer_id || price_offered)) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return", res.status(400).json({
                  status: 400,
                  message: 'Fill all required fields'
                }));

              case 5:
                car_id = parseInt(car_id, 10);
                buyer_id = parseInt(buyer_id, 10);
                price = parseFloat(_cars["default"].indexOf(car_id).price);
                price_offered = parseFloat(price_offered);
                _context.next = 11;
                return _order["default"].getCarDetails(req.body.car_id);

              case 11:
                _ref = _context.sent;
                rows = _ref.rows;

                if (!(rows.length < 1 || rows[0].carstatus.toLowerCase() !== 'available')) {
                  _context.next = 15;
                  break;
                }

                return _context.abrupt("return", res.status(400).json({
                  status: 400,
                  message: 'The car is not available.'
                }));

              case 15:
                owner_id = rows[0].owner_id;
                amount = price_offered;
                values = [car_id, buyer_id, owner_id, rows[0].price, amount];
                createdOrder = _order["default"].createOrder(values);
                return _context.abrupt("return", res.status(201).json({
                  status: 201,
                  data: createdOrder.rows[0]
                }));

              case 22:
                _context.prev = 22;
                _context.t0 = _context["catch"](0);
                res.status(_context.t0.statusCode || 500).json(_context.t0.message);

              case 25:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 22]]);
      }));

      function createOrder(_x, _x2) {
        return _createOrder.apply(this, arguments);
      }

      return createOrder;
    }()
  }, {
    key: "updatePrice",
    value: function () {
      var _updatePrice = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var order_id, newStatus, price, _ref2, rows, buyer_id, updatedPriceOrder, updateStatus;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                order_id = req.params.id;
                newStatus = req.body.status.toLowerCase();
                price = req.body.price;
                _context2.next = 6;
                return _order["default"].getAnOrder(order_id);

              case 6:
                _ref2 = _context2.sent;
                rows = _ref2.rows;

                if (!(rows.length < 1 || rows.length > 1)) {
                  _context2.next = 10;
                  break;
                }

                return _context2.abrupt("return", res.status(404).json({
                  status: 404,
                  message: 'Check that the order is still pending'
                }));

              case 10:
                buyer_id = req.body.user_id;

                if (!(parseFloat(req.body.price) === parseFloat(order.price_offered))) {
                  _context2.next = 13;
                  break;
                }

                return _context2.abrupt("return", res.status(400).json({
                  status: 400,
                  message: 'The new offered price and the old are the same'
                }));

              case 13:
                _context2.next = 15;
                return _order["default"].updateOrder(order_id, buyer_id, price);

              case 15:
                updatedPriceOrder = _context2.sent;
                _context2.next = 18;
                return _order["default"].updateOrderStatus(newStatus, order_id);

              case 18:
                updateStatus = _context2.sent;
                return _context2.abrupt("return", res.status(200).json({
                  status: 200,
                  data: updatedPriceOrder.rows[0],
                  info: updateStatus.rows[0]
                }));

              case 22:
                _context2.prev = 22;
                _context2.t0 = _context2["catch"](0);
                res.status(_context2.t0.statusCode || 500).json(_context2.t0.message);

              case 25:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 22]]);
      }));

      function updatePrice(_x3, _x4) {
        return _updatePrice.apply(this, arguments);
      }

      return updatePrice;
    }()
  }, {
    key: "getAllOrders",
    value: function getAllOrders(req, res) {
      try {
        var _Orders$getAllOrders = _order["default"].getAllOrders(),
            rows = _Orders$getAllOrders.rows;

        if (rows < 1) {
          return res.status(404).json({
            status: 404,
            message: 'There are no available orders.'
          });
        }

        return res.status(200).json({
          status: 200,
          data: rows
        });
      } catch (error) {
        res.status(error.statusCode || 500).json(error.message);
      }
    }
  }, {
    key: "getAnOrder",
    value: function () {
      var _getAnOrder = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var _ref3, rows, user_id, role, requester;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _order["default"].getAnOrder(req.params.order_id);

              case 3:
                _ref3 = _context3.sent;
                rows = _ref3.rows;

                if (rows) {
                  _context3.next = 7;
                  break;
                }

                return _context3.abrupt("return", res.status(404).json({
                  status: 404,
                  message: 'Order not found'
                }));

              case 7:
                user_id = req.user_id, role = req.role;
                requester = parseInt(req.user_id, 10);

                if (!(requester !== parseInt(rows[0].owner_id, 10) && requester !== parseInt(rows[0].buyer_id, 10) && !req.role)) {
                  _context3.next = 11;
                  break;
                }

                return _context3.abrupt("return", res.status(403).json({
                  status: 403,
                  message: 'You not authorized to view this order'
                }));

              case 11:
                return _context3.abrupt("return", res.status(200).json({
                  status: 200,
                  data: order
                }));

              case 14:
                _context3.prev = 14;
                _context3.t0 = _context3["catch"](0);
                res.status(_context3.t0.statusCode || 500).json(_context3.t0.message);

              case 17:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 14]]);
      }));

      function getAnOrder(_x5, _x6) {
        return _getAnOrder.apply(this, arguments);
      }

      return getAnOrder;
    }()
  }, {
    key: "deleteAnOrder",
    value: function () {
      var _deleteAnOrder = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(req, res) {
        var _ref4, rows, seller, user_id, role, requester, del;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return _order["default"].getAnOrder(req.params.order_id);

              case 3:
                _ref4 = _context4.sent;
                rows = _ref4.rows;

                if (rows) {
                  _context4.next = 7;
                  break;
                }

                return _context4.abrupt("return", res.status(404).json({
                  status: 404,
                  message: 'The order does not exist'
                }));

              case 7:
                seller = parseInt(order.owner_id, 10);
                user_id = req.user_id, role = req.role; // seller can deleted a cancelled order

                requester = parseInt(req.user_id, 10);

                if (!(requester !== seller && !req.role)) {
                  _context4.next = 12;
                  break;
                }

                return _context4.abrupt("return", res.status(403).json({
                  status: 403,
                  message: 'You dont have permission to delete this resource'
                }));

              case 12:
                if (!role) {
                  _context4.next = 18;
                  break;
                }

                _context4.next = 15;
                return _order["default"].deleteOrderAdmin(req.params.order_id);

              case 15:
                _context4.t0 = _context4.sent;
                _context4.next = 21;
                break;

              case 18:
                _context4.next = 20;
                return _order["default"].deleteOrderBySeller([req.params.order_id, user_id]);

              case 20:
                _context4.t0 = _context4.sent;

              case 21:
                del = _context4.t0;
                return _context4.abrupt("return", res.status(200).json({
                  status: 200,
                  data: del.rows[0]
                }));

              case 25:
                _context4.prev = 25;
                _context4.t1 = _context4["catch"](0);
                res.status(_context4.t1.statusCode || 500).json(_context4.t1.message);

              case 28:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 25]]);
      }));

      function deleteAnOrder(_x7, _x8) {
        return _deleteAnOrder.apply(this, arguments);
      }

      return deleteAnOrder;
    }()
  }]);

  return Order;
}();

var _default = Order;
exports["default"] = _default;