"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _cars = _interopRequireDefault(require("./mock_db/cars"));

var _app = _interopRequireDefault(require("../app"));

var _car = _interopRequireDefault(require("../models/car"));

var _user = _interopRequireDefault(require("../models/user"));

var _flag = _interopRequireDefault(require("../models/flag"));

var _users = _interopRequireDefault(require("./mock_db/users"));

var _flags = _interopRequireDefault(require("./mock_db/flags"));

var _orders = _interopRequireDefault(require("./mock_db/orders"));

var _order = _interopRequireDefault(require("../models/order"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var expect = _chai["default"].expect;

_chai["default"].use(_chaiHttp["default"]);

var token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo0LCJmaXJzdE5hbWUiOiJJYnUgRXJpYyIsImxhc3ROYW1lIjoiTWFydGluaSIsImFkZHJlc3MiOiIxLCBhZHJlc3Mgc3RyZWV0Iiwic3RhdHVzIjoicmVnaXN0ZXJlZCIsImVtYWlsIjoibWFydGluaXJleEB5YWhvby5jby51ayIsImlzX2FkbWluIjpmYWxzZSwicGFzc3dvcmQiOiIxMTExMTExMSJ9LCJpYXQiOjE1NjMwMjkyNTQsImV4cCI6MTU2MzE1ODg1NH0.hb5yIrzbO_JgBZYzgTyRPn9yriKaVGymKB86kEXkS6s';
describe('Order transaction', function () {
  describe('Create order', function () {
    it('should create an order', function (done) {
      _cars["default"][0].owner = _users["default"][1].id;
      _car["default"].cars = _cars["default"];
      _user["default"].users = _users["default"];
      var user = _users["default"][0];
      user.isAdmin = false;
      var price = parseInt(_cars["default"][0].price, 10) - 500000;
      var data = {
        buyerId: user.id,
        carId: _cars["default"][0].id,
        price: _cars["default"][0].price,
        priceOffered: price,
        sellerId: _users["default"][1].id
      };

      _chai["default"].request(server).post('/api/v1/order').set('Authorization', token).send(data).end(function (err, res) {
        expect(res.status).to.eq(200);
        expect(res.body.data).to.have.property('id');
        expect(res.body.data).to.have.property('carId').eq(data.carId);
        expect(res.body.data.price).to.eq(data.price);
        expect(res.body.data.priceOffered).to.eq(data.priceOffered);
        expect(res.body.data.sellerId).to.eq(data.sellerId);
        expect(res.body.data.buyerId).to.eq(data.buyerId);
        done();
      });
    });
    it('should return error 400 if carId or price is not supplied', function (done) {
      _cars["default"][0].owner = _users["default"][1].id;
      _car["default"].cars = _cars["default"];
      _user["default"].users = _users["default"];
      var user = _users["default"][0];
      user.isAdmin = false;
      var data = {
        buyerId: user.id,
        carId: _cars["default"][0].id,
        price: _cars["default"][0].price,
        priceOffered: '',
        sellerId: _users["default"][1].id
      };

      _chai["default"].request(server).post('/api/v1/order').set('Authorization', token).send(data).end(function (err, res) {
        expect(res.status).to.eq(400);
        expect(res.body.message).to.eq('Select car and state amount you want to pay');
        done();
      });
    });
    it('should return error 400 if car id is invalid', function (done) {
      _cars["default"][0].owner = _users["default"][1].id;
      _car["default"].cars = _cars["default"];
      _user["default"].users = _users["default"];
      var user = _users["default"][0];
      user.isAdmin = false;
      var price = parseInt(_cars["default"][0].price, 10) - 500000;
      var data = {
        buyerId: user.id,
        carId: 111222333444,
        price: _cars["default"][0].price,
        priceOffered: price,
        sellerId: _users["default"][1].id
      };

      _chai["default"].request(server).post('/api/v1/order').set('Authorization', token).send(data).end(function (err, res) {
        expect(res.status).to.eq(400);
        expect(res.body.message).to.eq('Select car and state amount you want to pay');
        done();
      });
    });
    it('should return error 404 if car is not found', function (done) {
      _cars["default"][0].owner = _users["default"][1].id;
      _car["default"].cars = _cars["default"];
      _user["default"].users = _users["default"];
      var user = _users["default"][0];
      user.isAdmin = false;
      var price = parseInt(_cars["default"][0].price, 10) - 500000;
      var data = {
        buyerId: user.id,
        carId: 1112223334445,
        price: _cars["default"][0].price,
        priceOffered: price,
        sellerId: _users["default"][1].id
      };

      _chai["default"].request(server).post('/api/v1/order').set('Authorization', token).send(data).end(function (err, res) {
        expect(res.status).to.eq(404);
        expect(res.body.message).to.eq('This car is not available for purchase');
        done();
      });
    });
    it('should return error 404 if car status is not == available', function (done) {
      _cars["default"][0].owner = _users["default"][1].id;
      _car["default"].cars = _cars["default"];
      _user["default"].users = _users["default"];
      var user = _users["default"][0];
      user.isAdmin = false;
      _cars["default"][0].status = 'sold';
      var price = parseInt(_cars["default"][0].price, 10) - 500000;
      var data = {
        buyerId: user.id,
        carId: _cars["default"][0].id,
        price: _cars["default"][0].price,
        priceOffered: price,
        sellerId: _users["default"][1].id
      };

      _chai["default"].request(server).post('/api/v1/order').set('Authorization', token).send(data).end(function (err, res) {
        expect(res.status).to.eq(404);
        expect(res.body.message).to.eq('This car is not available for purchase');
        done();
      });
    });
    it('should return 404 if seller is not active', function (done) {
      _cars["default"][0].owner = _users["default"][1].id;
      _car["default"].cars = _cars["default"];
      _user["default"].users = _users["default"];
      var user = _users["default"][0];
      user.isAdmin = false;
      _users["default"][1].status = 'suspended';
      _cars["default"][0].status = 'available';
      var price = parseInt(_cars["default"][0].price, 10) - 500000;
      var data = {
        buyerId: user.id,
        carId: _cars["default"][0].id,
        price: _cars["default"][0].price,
        priceOffered: price,
        sellerId: _users["default"][1].id
      };

      _chai["default"].request(server).post('/api/v1/order').set('Authorization', token).send(data).end(function (err, res) {
        expect(res.status).to.eq(404);
        expect(res.body.message).to.eq('Unverified seller. Kindly check back');
        done();
      });
    });
    it('should return 401 if user is not logged in', function (done) {
      _cars["default"][0].owner = _users["default"][1].id;
      _car["default"].cars = _cars["default"];
      _user["default"].users = _users["default"];
      var user = _users["default"][0];
      user.isAdmin = false;
      var price = parseInt(_cars["default"][0].price, 10) - 500000;
      var data = {
        buyerId: user.id,
        carId: _cars["default"][0].id,
        price: _cars["default"][0].price,
        priceOffered: price,
        sellerId: _users["default"][1].id
      };

      _chai["default"].request(server).post('/api/v1/order').send(data).end(function (err, res) {
        expect(res.status).to.eq(401);
        expect(res.body.message).to.eq('No authorization token provided');
        done();
      });
    });
  }); // seller update order price

  describe('Seller update order price while status is still pending', function () {
    it('should update the order price ', function (done) {
      _user["default"].users = _users["default"];
      _order["default"].orders = _orders["default"];
      var user = _users["default"][0];
      _orders["default"][0].sellerId = user.id;
      _orders["default"][0].status = 'pending';
      _orders["default"][0].buyerId = _users["default"][0].id;
      user.isAdmin = false;
      var newPrice = parseInt(_orders["default"][0].price, 10) - 100000;
      var data = {
        orderId: _orders["default"][0].id,
        newPrice: newPrice
      };

      _chai["default"].request(server).patch('/api/v1/order').set('Authorization', token).send(data).end(function (err, res) {
        expect(res.status).to.eq(200);
        expect(res.body.data.priceOffered).to.eq(data.newPrice);
        expect(res.body.data.buyerId).to.eq(user.id);
        done();
      });
    });
    it('should return error 400 if newprice is not stated ', function (done) {
      _cars["default"][0].owner = _users["default"][1].id;
      _car["default"].cars = _cars["default"];
      _user["default"].users = _users["default"];
      _order["default"].orders = _orders["default"];
      var user = _users["default"][0];
      _orders["default"][0].buyerId = user.id;
      user.isAdmin = false;
      var data = {
        orderId: _orders["default"][0].id,
        newPrice: ''
      };

      _chai["default"].request(server).patch('/api/v1/order').set('Authorization', token).send(data).end(function (err, res) {
        expect(res.status).to.eq(400);
        expect(res.body.message).to.eq('Ensure to send the order id and new price');
        done();
      });
    });
    it('should return error 400 if order id is not supplied ', function (done) {
      _cars["default"][0].owner = _users["default"][1].id;
      _car["default"].cars = _cars["default"];
      _user["default"].users = _users["default"];
      _order["default"].orders = _orders["default"];
      var user = _users["default"][0];
      _orders["default"][0].buyerId = user.id;
      user.isAdmin = false;
      var newPrice = parseInt(_orders["default"][0].price, 10);
      var data = {
        orderId: '',
        newPrice: newPrice
      };

      _chai["default"].request(server).patch('/api/v1/order').set('Authorization', token).send(data).end(function (err, res) {
        expect(res.status).to.eq(400);
        expect(res.body.message).to.eq('Ensure to send the order id and new price');
        done();
      });
    });
    it('should return error 404 if order is not found', function (done) {
      _cars["default"][0].owner = _users["default"][1].id;
      _car["default"].cars = _cars["default"];
      _user["default"].users = _users["default"];
      _order["default"].orders = _orders["default"];
      var user = _users["default"][0];
      _orders["default"][0].buyerId = user.id;
      user.isAdmin = false;
      var newPrice = parseInt(_orders["default"][0].price, 10);
      var data = {
        orderId: '6667778889990',
        newPrice: newPrice
      };

      _chai["default"].request(server).patch('/api/v1/order').set('Authorization', token).send(data).end(function (err, res) {
        // eslint-disable-next-line no-unused-expressions
        expect(err).to.be["null"];
        expect(res.status).to.eq(404);
        expect(res.body.message).to.eq('Check that the order is still pending');
        done();
      });
    });
    it('should return error 404 if order is no longer pending', function (done) {
      _cars["default"][0].owner = _users["default"][1].id;
      _car["default"].cars = _cars["default"];
      _user["default"].users = _users["default"];
      _order["default"].orders = _orders["default"];
      var user = _users["default"][0];
      _orders["default"][0].buyerId = user.id;
      user.isAdmin = false;
      var newPrice = parseInt(_orders["default"][0].price, 10);
      _orders["default"][0].status = 'Rejected';
      var data = {
        orderId: _orders["default"][0].id,
        newPrice: newPrice
      };

      _chai["default"].request(server).patch('/api/v1/order').set('Authorization', token).send(data).end(function (err, res) {
        // eslint-disable-next-line no-unused-expressions
        expect(err).to.be["null"];
        expect(res.status).to.eq(404);
        expect(res.body.message).to.eq('Check that the order is still pending');
        done();
      });
    });
    it('should return error 400 if old and new prices are the same ', function (done) {
      _cars["default"][0].owner = _users["default"][1].id;
      _car["default"].cars = _cars["default"];
      _user["default"].users = _users["default"];
      _order["default"].orders = _orders["default"];
      var user = _users["default"][0];
      user.isAdmin = false;
      _orders["default"][0].status = 'pending';
      var data = {
        orderId: _orders["default"][0].id,
        newPrice: _orders["default"][0].priceOffered
      };

      _chai["default"].request(server).patch('/api/v1/order').set('Authorization', token).send(data).end(function (err, res) {
        expect(res.status).to.eq(400);
        expect(res.body.message).to.eq('The new offered price and the old are the same');
        done();
      });
    });
  }); // User retrieves his/her completed orders

  describe('User get his/her sold ads', function () {
    it('should return an array of the users sold ads', function (done) {
      _orders["default"][0].sellerId = _users["default"][0].id;
      _orders["default"][0].status = 'completed';
      _user["default"].users = _users["default"];
      _order["default"].orders = _orders["default"];
      var user = _users["default"][0];
      user.isAdmin = false;

      _chai["default"].request(server).get('/api/v1/orders/me').set('Authorization', token).end(function (err, res) {
        expect(res.status).to.eq(200);
        expect(res.body.data).to.be.an('Array');
        expect(res.body.data[0]).to.have.property('sellerId').eq(user.id);
        expect(res.body.data[0]).to.have.property('status').eq('completed');
        done();
      });
    });
    it('should return error 404 if user has not sold on the platform', function (done) {
      _orders["default"][0].sellerId = _users["default"][1].id;
      _user["default"].users = _users["default"];
      var user = _users["default"][0];
      user.isAdmin = false;

      _chai["default"].request(server).get('/api/v1/orders/me').set('Authorization', token).end(function (err, res) {
        expect(res.status).to.eq(404);
        expect(res.body.message).to.eq('You have not sold on the platform');
        done();
      });
    });
    it('should return error 401 if user is not logged in', function (done) {
      _user["default"].users = _users["default"];
      _order["default"].orders = _orders["default"];

      _chai["default"].request(server).get('/api/v1/orders/me').end(function (err, res) {
        expect(res.status).to.eq(401);
        expect(res.body.message).to.eq('No authorization token provided');
        done();
      });
    });
  }); // view all orders

  describe('View all orders', function () {
    it('should return all orders placed', function (done) {
      _user["default"].users = _users["default"];
      _order["default"].orders = _orders["default"];
      var user = _users["default"][0];
      user.isAdmin = true;

      _chai["default"].request(server).get('/api/v1/orders').set('Authorization', token).end(function (err, res) {
        expect(res.status).to.eq(200);
        expect(res.body.data).to.be.an('Array');
        expect(res.body.data[0]).to.have.property('id').eq(_orders["default"][0].id);
        done();
      });
    });
    it('should return error 404 if there are no orders', function (done) {
      _user["default"].users = _users["default"];
      _order["default"].orders = [];
      var user = _users["default"][0];
      user.isAdmin = true;

      _chai["default"].request(server).get('/api/v1/orders').set('Authorization', token).end(function (err, res) {
        expect(res.body.status).to.eq(404);
        expect(res.body.message).to.eq('There are no orders now. Check back');
        done();
      });
    });
    it('should return error 401 if user is not logged in', function (done) {
      _order["default"].orders = _orders["default"];

      _chai["default"].request(server).get('/api/v1/orders').end(function (err, res) {
        expect(res.body.status).to.eq(401);
        expect(res.body.message).to.eq('No authorization token provided');
        done();
      });
    });
    it('should return error 401 if user is not admin', function (done) {
      _user["default"].users = _users["default"];
      _order["default"].orders = _orders["default"];
      var user = _users["default"][0];
      user.isAdmin = false;

      _chai["default"].request(server).get('/api/v1/orders').set('Authorization', token).end(function (err, res) {
        expect(res.status).to.eq(401);
        expect(res.body.message).to.eq('You dont have the permission to access this resource');
        done();
      });
    });
  }); // view a single order

  describe('View a single order', function () {
    it('should return order if it is admin', function (done) {
      _user["default"].users = _users["default"];
      var id = _orders["default"][0].id;
      _order["default"].orders = _orders["default"];
      var user = _users["default"][0];
      user.isAdmin = true;

      _chai["default"].request(server).get("/api/v1/orders/".concat(id)).set('Authorization', token).end(function (err, res) {
        expect(res.status).to.eq(200);
        expect(res.body.data.id).to.eq(id);
        done();
      });
    });
    it('should return order if it is the seller', function (done) {
      _user["default"].users = _users["default"];
      var id = _orders["default"][0].id;
      _orders["default"][0].sellerId = _users["default"][0].id;
      _order["default"].orders = _orders["default"];
      var user = _users["default"][0];
      user.isAdmin = false;

      _chai["default"].request(server).get("/api/v1/orders/".concat(id)).set('Authorization', token).end(function (err, res) {
        expect(res.status).to.eq(200);
        expect(res.body.data.id).to.eq(id);
        done();
      });
    });
    it('should return order if it is the buyer', function (done) {
      _user["default"].users = _users["default"];
      var id = _orders["default"][0].id;
      _orders["default"][0].buyerId = _users["default"][0].id;
      _order["default"].orders = _orders["default"];
      var user = _users["default"][0];
      user.isAdmin = false;

      _chai["default"].request(server).get("/api/v1/orders/".concat(id)).set('Authorization', token).end(function (err, res) {
        expect(res.status).to.eq(200);
        expect(res.body.data.id).to.eq(id);
        done();
      });
    });
    it('should return error 404 if order is not found', function (done) {
      _user["default"].users = _users["default"];

      var _ref = _orders["default"][0] + 1,
          id = _ref.id;

      _orders["default"][0].buyerId = _users["default"][0].id;
      _order["default"].orders = _orders["default"];
      var user = _users["default"][0];
      user.isAdmin = false;

      _chai["default"].request(server).get("/api/v1/orders/".concat(id)).set('Authorization', token).end(function (err, res) {
        expect(res.status).to.eq(404);
        expect(res.body.message).to.eq('Order not found');
        done();
      });
    });
    it('should return error 403 if it is not buyer or seller or admin', function (done) {
      _user["default"].users = _users["default"];
      var id = _orders["default"][0].id;
      _orders["default"][0].buyerId = _users["default"][1].id;
      _orders["default"][0].sellerId = _users["default"][2].id;
      _order["default"].orders = _orders["default"];
      var user = _users["default"][0];
      user.isAdmin = false;

      _chai["default"].request(server).get("/api/v1/orders/".concat(id)).set('Authorization', token).end(function (err, res) {
        expect(res.status).to.eq(403);
        expect(res.body.message).to.eq('You dont have the permission to view this resource');
        done();
      });
    });
  }); // update order status

  describe('Seller and Buyer update order status', function () {
    afterEach(function () {
      _user["default"].users = [];
      _order["default"].orders = [];
    });
    it('should update order status by seller when it is pending', function (done) {
      var id = _orders["default"][0].id;
      _orders["default"][0].status = 'pending';
      _orders["default"][0].sellerId = _users["default"][0].id;
      _orders["default"][0].buyerId = _users["default"][1].id;
      _users["default"][1].status = 'active';
      _order["default"].orders = _orders["default"];
      _user["default"].users = _users["default"];
      var user = _users["default"][0];
      user.isAdmin = false;

      _chai["default"].request(server).patch("/api/v1/orders/".concat(id)).set('Authorization', token).send({
        status: 'accepted'
      }).end(function (err, res) {
        expect(res.status).to.eq(200);
        expect(res.body.data.id).to.eq(id);
        expect(res.body.data.status).to.eq('accepted');
        done();
      });
    });
    it('should update order status by buyer if the status is accepted', function (done) {
      var id = _orders["default"][0].id;
      _orders["default"][0].status = 'accepted';
      _orders["default"][0].sellerId = _users["default"][0].id;
      _orders["default"][0].buyerId = _users["default"][1].id;
      _order["default"].orders = _orders["default"];
      _user["default"].users = _users["default"];
      var user = _users["default"][1];
      user.isAdmin = false;

      _chai["default"].request(server).patch("/api/v1/orders/".concat(id)).set('Authorization', token).send({
        status: 'completed'
      }).end(function (err, res) {
        expect(res.status).to.eq(200);
        expect(res.body.data.id).to.eq(id);
        expect(res.body.data.status).to.eq('completed');
        done();
      });
    });
    it('should return error 400 if status is not sent', function (done) {
      var id = _orders["default"][0].id;
      _orders["default"][0].status = 'accepted';
      _orders["default"][0].sellerId = _users["default"][0].id;
      _orders["default"][0].buyerId = _users["default"][1].id;
      _order["default"].orders = _orders["default"];
      _user["default"].users = _users["default"];
      var user = _users["default"][1];
      user.isAdmin = false;

      _chai["default"].request(server).patch("/api/v1/orders/".concat(id)).set('Authorization', token).end(function (err, res) {
        expect(res.status).to.eq(400);
        expect(res.body.message).to.eq('Invalid input');
        done();
      });
    });
    it('should return error 404 if order id is not found', function (done) {
      var id = _orders["default"][0].id;
      _orders["default"][0].status = 'accepted';
      _orders["default"][0].sellerId = _users["default"][0].id;
      _orders["default"][0].buyerId = _users["default"][1].id;
      _order["default"].orders = _orders["default"];
      _user["default"].users = _users["default"];
      var user = _users["default"][1];
      user.isAdmin = false;

      _chai["default"].request(server).patch("/api/v1/orders/".concat(id + 1)).set('Authorization', token).send({
        status: 'completed'
      }).end(function (err, res) {
        expect(res.status).to.eq(404);
        expect(res.body.message).to.eq('Order details not found');
        done();
      });
    });
    it('should return error 406 if seller or buyer is inactive', function (done) {
      var id = _orders["default"][1].id;
      _orders["default"][1].sellerId = _users["default"][1].id;
      _orders["default"][1].buyerId = _users["default"][2].id;
      _users["default"][2].status = 'disabled';
      _order["default"].orders = _orders["default"];
      _user["default"].users = _users["default"];
      var user = _users["default"][1];
      user.isAdmin = false;

      _chai["default"].request(server).patch("/api/v1/orders/".concat(id)).set('Authorization', token).send({
        status: 'completed'
      }).end(function (err, res) {
        expect(res.status).to.eq(406);
        expect(res.body.message).to.eq('Seller or buyer inactive');
        done();
      });
    });
    it('should return error 403 if another user/admin attempts to update the order status', function (done) {
      var id = _orders["default"][1].id;
      _orders["default"][1].sellerId = _users["default"][1].id;
      _orders["default"][1].buyerId = _users["default"][0].id;
      _users["default"][0].status = 'active';
      _users["default"][1].status = 'active';
      _order["default"].orders = _orders["default"];
      _user["default"].users = _users["default"];
      var user = _users["default"][2];
      user.isAdmin = true;

      _chai["default"].request(server).patch("/api/v1/orders/".concat(id)).set('Authorization', token).send({
        status: 'completed'
      }).end(function (err, res) {
        expect(res.status).to.eq(403);
        expect(res.body.message).to.eq('You dont have the permission to modify this resource');
        done();
      });
    });
    it('should return error 400 if buyer wants to update a pending order', function (done) {
      var id = _orders["default"][1].id;
      _orders["default"][1].sellerId = _users["default"][1].id;
      _orders["default"][1].buyerId = _users["default"][0].id;
      _users["default"][0].status = 'active';
      _users["default"][1].status = 'active';
      _order["default"].orders = _orders["default"];
      _user["default"].users = _users["default"];
      var user = _users["default"][0];
      user.isAdmin = false;

      _chai["default"].request(server).patch("/api/v1/orders/".concat(id)).set('Authorization', token).send({
        status: 'completed'
      }).end(function (err, res) {
        expect(res.status).to.eq(400);
        expect(res.body.message).to.eq('You cannot update the status of this order at its state');
        done();
      });
    });
    it('should return error 400 if seller wants to update a cancelled order', function (done) {
      var id = _orders["default"][1].id;
      _orders["default"][1].status = 'cancelled';
      _orders["default"][1].sellerId = _users["default"][1].id;
      _orders["default"][1].buyerId = _users["default"][0].id;
      _users["default"][0].status = 'active';
      _users["default"][1].status = 'active';
      _order["default"].orders = _orders["default"];
      _user["default"].users = _users["default"];
      var user = _users["default"][1];
      user.isAdmin = false;

      _chai["default"].request(server).patch("/api/v1/orders/".concat(id)).set('Authorization', token).send({
        status: 'completed'
      }).end(function (err, res) {
        expect(res.status).to.eq(400);
        expect(res.body.message).to.eq('You cannot update the status of this order at its state');
        done();
      });
    });
  }); // delete an order -  seller and admin can delete a cancelled order

  describe('deletes a cancelled order', function () {
    it('should return error 400 if seller attempts to delete an uncancelled order', function (done) {
      _user["default"].users = _users["default"];
      var id = _orders["default"][0].id;
      _orders["default"][0].status = 'rejected';
      _orders["default"][0].sellerId = _users["default"][0].id;
      _orders["default"][0].buyerId = _users["default"][1].id;
      _order["default"].orders = _orders["default"];
      var user = _users["default"][0];
      user.isAdmin = false;

      _chai["default"].request(server)["delete"]("/api/v1/orders/".concat(id)).set('Authorization', token).end(function (err, res) {
        expect(res.status).to.eq(400);
        expect(res.body.message).to.eq('You cannot delete an incomplete transaction');
        done();
      });
    });
    it('should return error 404 if order is not found', function (done) {
      _user["default"].users = _users["default"];
      _order["default"].orders = _orders["default"];
      var user = _users["default"][0];
      user.isAdmin = true;

      _chai["default"].request(server)["delete"]('/api/v1/orders/1678787878781').set('Authorization', token).end(function (err, res) {
        expect(res.status).to.eq(404);
        expect(res.body.message).to.eq('The order does not exist');
        done();
      });
    });
    it('should return error 403 if a logged in user attempts to delete the order', function (done) {
      _user["default"].users = _users["default"];
      var id = _orders["default"][0].id;
      _orders["default"][0].sellerId = _users["default"][0].id;
      _orders["default"][0].buyerId = _users["default"][1].id;
      _order["default"].orders = _orders["default"];
      var user = _users["default"][2];
      user.isAdmin = false;

      _chai["default"].request(server)["delete"]("/api/v1/orders/".concat(id)).set('Authorization', token).end(function (err, res) {
        expect(res.status).to.eq(403);
        expect(res.body.message).to.eq('You dont have permission to delete this resource');
        done();
      });
    });
    it('seller should delete an order that is cancelled', function (done) {
      _user["default"].users = _users["default"];
      var id = _orders["default"][0].id;
      _orders["default"][0].status = 'cancelled';
      _orders["default"][0].sellerId = _users["default"][0].id;
      _orders["default"][0].buyerId = _users["default"][1].id;
      _order["default"].orders = _orders["default"];
      var user = _users["default"][0];
      user.isAdmin = false;

      _chai["default"].request(server)["delete"]("/api/v1/orders/".concat(id)).set('Authorization', token).end(function (err, res) {
        expect(res.status).to.eq(200);
        expect(res.body.data.id).to.eq(id);
        done();
      });
    });
    it('admin should delete any order', function (done) {
      _user["default"].users = _users["default"];
      var id = _orders["default"][0].id;
      _orders["default"][0].status = 'accepted';
      _order["default"].orders = _orders["default"];
      var user = _users["default"][0];
      user.isAdmin = true;

      _chai["default"].request(server)["delete"]("/api/v1/orders/".concat(id)).set('Authorization', token).end(function (err, res) {
        expect(res.status).to.eq(200);
        expect(res.body.data.id).to.eq(id);
        done();
      });
    });
  });
});