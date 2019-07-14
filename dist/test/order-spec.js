"use strict";

var _chai = require("chai");

var _orders = _interopRequireDefault(require("./mock_db/orders"));

var _order = _interopRequireDefault(require("../models/order"));

var _users = _interopRequireDefault(require("./mock_db/users"));

var _cars = _interopRequireDefault(require("./mock_db/cars"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('Test Order Endpoint', function () {
  describe('Create a car order', function () {
    it('should create a car purchase order', function () {
      var buyerId = _users["default"][2].id;
      var ownerId = _cars["default"][0].owner;
      var newOrder = {
        carId: 1,
        buyerId: buyerId,
        ownerId: ownerId,
        email: 'jason@gmail.com',
        createdOn: '5/15/2018',
        manufacturer: 'Honda',
        price: 4500000,
        status: 'available',
        state: 'used',
        body_type: 'Saloon',
        priceOffered: 3500000
      };

      var order = _order["default"].createOrder(newOrder);

      (0, _chai.expect)(order).to.have.property('createdOn');
      (0, _chai.expect)(order).to.have.property('priceOffered');
      (0, _chai.expect)(order.owner_id).to.eq(_cars["default"][0].owner);
      (0, _chai.expect)(order.buyer_id).to.eq(_users["default"][2].id);
    });
  });
  describe('Get all orders', function () {
    it('should return all orders', function () {
      _order["default"].orders = _orders["default"];

      var allOrders = _order["default"].getAllOrders();

      (0, _chai.expect)(allOrders).to.be.an('Array');
      (0, _chai.expect)(allOrders[0].id).to.eq(_orders["default"][0].id);
    });
  });
  describe('Get a single order', function () {
    it('should return a specific order', function () {
      _order["default"].orders = _orders["default"];

      var getOrder = _order["default"].getAnOrder(_orders["default"][0].id);

      (0, _chai.expect)(getOrder).to.be.an('object');
      (0, _chai.expect)(getOrder.id).to.equal(_orders["default"][0].id);
    });
  });
  describe('Update an order', function () {
    it('should update the status of an order', function () {
      _orders["default"][0].status = 'pending';
      _order["default"].orders = _orders["default"];

      var updatedOrder = _order["default"].updateOrder(_orders["default"][0].id, 'sold');

      (0, _chai.expect)(updatedOrder.status).to.equal('sold');
      (0, _chai.expect)(updatedOrder.id).to.equal(_orders["default"][0].id);
    });
  });
  describe('Delete an order', function () {
    it('should delete an order', function () {
      _order["default"].orders = _orders["default"];
      var length = _orders["default"].length;
      var order = _orders["default"][0];

      _order["default"].deleteOrder(order);

      var res = _order["default"].getAnOrder(order.id);

      (0, _chai.expect)(res).to.equal(undefined);
      (0, _chai.expect)(_orders["default"].length).to.equal(length - 1);
    });
  });
});