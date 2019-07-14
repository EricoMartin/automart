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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var expect = _chai["default"].expect;

_chai["default"].use(_chaiHttp["default"]);

var token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo0LCJmaXJzdE5hbWUiOiJJYnUgRXJpYyIsImxhc3ROYW1lIjoiTWFydGluaSIsImFkZHJlc3MiOiIxLCBhZHJlc3Mgc3RyZWV0Iiwic3RhdHVzIjoicmVnaXN0ZXJlZCIsImVtYWlsIjoibWFydGluaXJleEB5YWhvby5jby51ayIsImlzX2FkbWluIjpmYWxzZSwicGFzc3dvcmQiOiIxMTExMTExMSJ9LCJpYXQiOjE1NjMwMjkyNTQsImV4cCI6MTU2MzE1ODg1NH0.hb5yIrzbO_JgBZYzgTyRPn9yriKaVGymKB86kEXkS6s';
describe('Flags controller', function () {
  describe('Create a flag', function () {
    it('should create a flag on an ad', function (done) {
      _cars["default"][0].owner = _users["default"][1].id;
      _car["default"].cars = _cars["default"];
      _user["default"].users = _users["default"];
      var user = _users["default"][0];
      user.isAdmin = false;
      var data = {
        car_id: 1,
        reason: 'Wrong Description',
        description: 'The car description is misleading',
        user_id: 3
      };

      _chai["default"].request(_app["default"]).post('/api/v1/flag/report').set('Authorization', token).send(data).end(function (err, res) {
        expect(res.status).to.eq(201);
        expect(res.body.data).to.have.property('id');
        expect(res.body.data).to.have.property('car_id').eq(data.car_id);
        expect(res.body.data.reason).to.eq(data.reason);
        done();
      });
    });
    it('should return error 400 if reason is not stated', function (done) {
      _cars["default"][0].owner = _users["default"][1].id;
      _car["default"].cars = _cars["default"];
      _user["default"].users = _users["default"];
      var user = _users["default"][0];
      user.isAdmin = false;
      var data = {
        car_id: 1,
        reason: ' ',
        description: 'Weird description of the car by the owner',
        user_id: user.id
      };

      _chai["default"].request(_app["default"]).post('/api/v1/flag/report').set('Authorization', token).send(data).end(function (err, res) {
        expect(res.status).to.eq(400);
        expect(res.status.message).to.eq('Note that reason and description cannot be mnore than 60 words');
        done();
      });
    });
    it('should return 400 error if car id is not stated', function (done) {
      _cars["default"][0].owner = _users["default"][1].id;
      _car["default"].cars = _cars["default"];
      _user["default"].users = _users["default"];
      var user = _users["default"][0];
      user.isAdmin = false;
      ;
      var data = {
        car_id: '',
        reason: 'stolen',
        description: 'Bad description of the car ',
        user_id: user.id
      };

      _chai["default"].request(_app["default"]).post('/api/v1/flag/report').set('Authorization', token).send(data).end(function (err, res) {
        expect(res.status).to.eq(400);
        expect(res.body.car_id).to.equal(undefined);
        expect(res.body.message).to.eq('car id must be a number');
        done();
      });
    });
  });
  describe('Update a flag', function () {
    it('should update a flag status to resolved', function () {
      _flags["default"][0].status = 'pending';
      var id = _flags["default"][0].id;
      _flag["default"].flags = _flags["default"];
      _user["default"].users = _users["default"];
      var user = _users["default"][0];
      user.isAdmin = true;

      _chai["default"].request(_app["default"]).patch("/api/v1/flag/".concat(id)).set('Authorization', token).end(function (err, res) {
        expect(res.status).to.eq(200);
        expect(res.body.data.id).to.eq(id);
        expect(res.body.data.status).to.eq('resolved');
      });
    });
    it('should return error 401 if user is not logged in', function () {
      _flags["default"][0].status = 'pending';
      var id = _flags["default"][0].id;
      _flag["default"].flags = _flags["default"];

      _chai["default"].request(_app["default"]).patch("/api/v1/flag/".concat(id)).end(function (err, res) {
        expect(res.status).to.eq(401);
        expect(res.body.error).to.eq('Authentication failed! Please Login again');
      });
    });
    it('should return error 401 if logged in user is not admin', function () {
      _flags["default"][0].status = 'pending';
      var id = _flags["default"][0].id;
      _flag["default"].flags = _flags["default"];
      _user["default"].users = _users["default"];
      var user = _users["default"][0];
      user.isAdmin = false;

      _chai["default"].request(_app["default"]).patch("/api/v1/flag/".concat(id)).set('Authorization', token).end(function (err, res) {
        expect(res.status).to.eq(401);
        expect(res.body.message).to.eq('You dont have the permission to access this resource');
      });
    });
    it('should return error 404 if flag id is wrong', function () {
      _flags["default"][0].status = 'pending';
      var id = _flags["default"][0].id;
      _flag["default"].flags = _flags["default"];
      _user["default"].users = _users["default"];
      var user = _users["default"][0];
      user.isAdmin = true;

      _chai["default"].request(_app["default"]).patch("/api/v1/flag/".concat(id + 1)).set('Authorization', token).end(function (err, res) {
        expect(res.status).to.eq(404);
        expect(res.body.message).to.eq('Flag not found');
      });
    });
  });
  describe('Get all flags', function () {
    it('should return all flags', function (done) {
      var user = _users["default"][0];
      _flag["default"].flags = _flags["default"];
      user.isAdmin = true;

      _chai["default"].request(_app["default"]).get('/api/v1/auth/admin/flags').set('Authorization', token).end(function (err, res) {
        expect(res.status).to.eq(200);
        expect(res.body.data).to.be.an('Array');
        expect(res.body.data[0]).to.be.an('Object');
        done();
      });
    });
    it('should return error 404 if there are no flags', function (done) {
      var user = _users["default"][0];
      _flag["default"].flags = [];
      user.isAdmin = true;

      _chai["default"].request(_app["default"]).get('/api/v1/auth/admin/flags').set('Authorization', token).end(function (err, res) {
        expect(res.status).to.eq(404);
        expect(res.body.message).to.eq('There are no flags now.');
        done();
      });
    });
    it('should return error 401 if user is not logged in', function (done) {
      _flag["default"].flags = _flags["default"];

      _chai["default"].request(_app["default"]).get('/api/v1/flags').end(function (err, res) {
        expect(res.status).to.eq(401);
        expect(res.body.message).to.eq('No authorization token provided');
        done();
      });
    });
    it('should return error 401 if user is not admin', function (done) {
      var user = _users["default"][0];
      _flag["default"].flags = _flags["default"];
      user.isAdmin = false;

      _chai["default"].request(_app["default"]).get('/api/v1/flag').set('Authorization', token).end(function (err, res) {
        expect(res.status).to.eq(401);
        expect(res.body.message).to.eq('You dont have the permission to access this resource');
        done();
      });
    });
  });
  describe('Admin can delete a given flag', function () {
    it('should delete a given flag id', function (done) {
      var user = _users["default"][0];
      var flagId = _flags["default"][0].id;
      _flag["default"].flags = _flags["default"];
      user.isAdmin = true;

      _chai["default"].request(_app["default"])["delete"]("/api/v1/auth/admin/flag/".concat(flagId)).set('Authorization', token).end(function (err, res) {
        expect(res.status).to.eq(200);
        expect(res.body.message).to.eq('Flag successfully deleted');
        done();
      });
    });
    it('should return error 404 if flag is not found', function (done) {
      var user = _users["default"][0];
      var flagId = _flags["default"][0].id + 1;
      _flag["default"].flags = _flags["default"];
      user.isAdmin = true;

      _chai["default"].request(_app["default"])["delete"]("/api/v1/auth/admin/flag/".concat(flagId)).set('Authorization', token).end(function (err, res) {
        expect(res.status).to.eq(404);
        expect(res.body.message).to.eq('The flag is no longer available');
        done();
      });
    });
  });
});