"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _queries = _interopRequireDefault(require("./queries"));

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
      regeneratorRuntime.mark(function _callee(data) {
        var text;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                text = 'INSERT INTO orders (car_id, buyer_id, owner_id, created_on, price, price_offered) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
                return _context.abrupt("return", _queries["default"].query(text, data));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function createOrder(_x) {
        return _createOrder.apply(this, arguments);
      }

      return createOrder;
    }()
  }, {
    key: "getAllOrders",
    value: function getAllOrders() {
      return _queries["default"].query('SELECT * FROM orders ORDER BY updated_at DESC');
    }
  }, {
    key: "getAnOrder",
    value: function getAnOrder(id) {
      var text = 'SELECT * FROM orders WHERE id=$1';
      return _queries["default"].query(text, [id]);
    }
  }, {
    key: "getOrderPrice",
    value: function getOrderPrice(data) {
      var text = 'SELECT price_offered FROM orders WHERE id=$1 AND status NOT IN (\'accepted\', \'cancelled\')';
      return _queries["default"].query(text, data);
    }
  }, {
    key: "validOrder",
    value: function () {
      var _validOrder = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(data) {
        var text;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                text = 'SELECT id FROM orders WHERE car_id=$1 AND buyer_id=$2 AND status NOT IN (\'rejected\', \'cancelled\')';
                return _context2.abrupt("return", db.query(text, data));

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function validOrder(_x2) {
        return _validOrder.apply(this, arguments);
      }

      return validOrder;
    }()
  }, {
    key: "updateOrder",
    value: function updateOrder(data) {
      var query = 'UPDATE orders SET price_offered=$1 WHERE id=$2 AND buyer_id=$3 returning *';
      return _queries["default"].query(query, data);
    }
  }, {
    key: "updateOrderStatus",
    value: function updateOrderStatus(data) {
      var text = 'UPDATE orders SET status=$1 WHERE id=$2 RETURNING *';
      return _queries["default"].query(text, data);
    }
  }, {
    key: "deleteOrderAdmin",
    value: function deleteOrderAdmin(id) {
      var query = 'DELETE FROM orders WHERE id=$1 RETURNING *';
      return _queries["default"].query(query, [id]);
    }
  }, {
    key: "deleteOrderBySeller",
    value: function deleteOrderBySeller(data) {
      var query = 'DELETE FROM orders WHERE id=$1 AND seller_id=$2 AND status=\'cancelled\' RETURNING *';
      return _queries["default"].query(query, data);
    }
  }, {
    key: "getCarDetails",
    value: function getCarDetails(car_id) {
      var query = 'SELECT * FROM cars WHERE car_id=$1';
      return _queries["default"].query(query, [car_id]);
    }
  }]);

  return Order;
}();

var _default = Order;
exports["default"] = _default;