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

var token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo1LCJlbWFpbCI6Im1hcnRpbmlyZXhAeWFob28uY28udWsiLCJmaXJzdF9uYW1lIjoiSWJ1RXJpYyIsImxhc3RfbmFtZSI6Ik1hcnRpbmkiLCJwYXNzd29yZCI6IiIsImFkZHJlc3MiOiIxLCBhZHJlc3Mgc3RyZWV0IiwiaXNfYWRtaW4iOmZhbHNlLCJzdGF0dXMiOiJyZWdpc3RlcmVkIn0sImlhdCI6MTU2MzE4NDY2NiwiZXhwIjoxNTYzMzE0MjY2fQ.eD6lUU0Jqeaa6HZvISs6DtV0WHpm1LwlZnIsZ4V-Wys';
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
    it('should return error 404 if flag id is wrong', function () {
      _flags["default"][0].status = 'pending';
      var id = _flags["default"][0].id;
      _flag["default"].flags = _flags["default"];
      _user["default"].users = _users["default"];
      var user = _users["default"][0];
      user.isAdmin = true;

      _chai["default"].request(_app["default"]).patch("/api/v1/flag/".concat(id + 1)).set('Authorization', token).end(function (err, res) {
        expect(res.status).to.eq(404); //expect(res.body.message).to.equal('Flag not found');
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
  });
});