"use strict";

var _chai = require("chai");

var _flags = _interopRequireDefault(require("./mock_db/flags"));

var _flag = _interopRequireDefault(require("../models/flag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('Test Flag Endpoint', function () {
  describe('Create Flag Endpoint', function () {
    it('should create a flag', function () {
      var flagData = {
        id: 1,
        car_id: 2,
        created_on: '10/10/2018',
        reason: 'fraudulent',
        description: 'fake advert',
        status: 'pending'
      };

      var newFlag = _flag["default"].createdFlag(flagData);

      (0, _chai.expect)(newFlag).to.have.property('id');
      (0, _chai.expect)(newFlag).to.have.property('car_id');
      (0, _chai.expect)(newFlag).to.have.property('reason');
      (0, _chai.expect)(newFlag).to.have.property('description');
      (0, _chai.expect)(_flags["default"][0].id).to.equal(flagData.id);
      (0, _chai.expect)(newFlag.car_id).to.be.a('number');
      (0, _chai.expect)(newFlag.reason).to.be.a('string');
      (0, _chai.expect)(newFlag.description).to.be.a('string');

      _chai.assert.isNumber(newFlag.id, 'ID is not a number');

      _chai.assert.isNumber(newFlag.car_id, 'Car ID is not a number');

      _chai.assert.isString(newFlag.reason, 'Reason is not a string');

      _chai.assert.isString(newFlag.description, 'Description is not a string');
    });
  });
  describe('car_id must be  a number', function () {
    it('should return error if a car_id is not a number', function () {
      var badFlag = {
        id: 8,
        car_id: 60,
        created_on: '10/10/2018',
        reason: 'fraudulent',
        description: 'fake advert',
        status: 'pending'
      };

      var wrongFlag = _flag["default"].createdFlag(badFlag);

      _chai.assert.isNumber(wrongFlag.car_id, 'Car Id must be a number');
    });
    it('should return error if a car_id is empty', function () {
      var badFlag = {
        id: 8,
        car_id: '7',
        created_on: '10/10/2018',
        reason: 'fraudulent',
        description: 'fake advert',
        status: 'pending'
      };

      var wrongFlag = _flag["default"].createdFlag(badFlag);

      _chai.assert.isNotEmpty(wrongFlag.car_id, 'Car Id must not be empty');
    });
  });
  describe('reason must not be empty', function () {
    it('Should return an error message if reason is empty', function () {
      var flagData = {
        id: 1,
        car_id: 2,
        created_on: '10/10/2018',
        reason: 'fraudulent',
        description: 'fake advert',
        status: 'pending'
      };

      _chai.assert.isNotEmpty(flagData.reason, 'Reason must not be empty');
    });
  });
  describe('description must not be empty', function () {
    it('Should return an error message if description is empty', function () {
      var flagData = {
        id: 1,
        car_id: 2,
        created_on: '10/10/2018',
        reason: 'fraudulent',
        description: 'fake',
        status: 'pending'
      };

      _chai.assert.isNotEmpty(flagData.description, 'description must not be empty');
    });
  });
  describe('Update a flag status', function () {
    it('should update a given flag status to resolved', function () {
      _flags["default"][0].status = 'pending';
      _flag["default"].flags = _flags["default"];
      var flagId = _flags["default"][0].id;

      var flagstatus = _flag["default"].updateFlagStatus(flagId);

      (0, _chai.expect)(flagstatus).to.have.property('id').eq(_flags["default"][0].id);
      (0, _chai.expect)(flagstatus).to.have.property('car_id').eq(_flags["default"][0].car_id);
      (0, _chai.expect)(flagstatus).to.have.property('status').eq('resolved');
    });
  });
  describe('Deletes a flag', function () {
    it('should delete a given flag', function () {
      _flag["default"].flags = _flags["default"];
      var length = _flags["default"].length;
      var flagdata = _flags["default"][0];

      _flag["default"].deleteFlag(flagdata);

      var res = _flag["default"].findFlag(_flags["default"].id);

      (0, _chai.expect)(res).to.eq(undefined);
      (0, _chai.expect)(_flags["default"].length).to.eq(length - 1);
    });
  });
});