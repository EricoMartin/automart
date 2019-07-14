"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _users = _interopRequireDefault(require("./mock_db/users"));

var _user = _interopRequireDefault(require("../models/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var expect = _chai["default"].expect;
describe('user Endpoint', function () {
  describe('user can signup', function () {
    it('should create user account', function () {
      var data = {
        id: 1,
        firstName: 'Jason',
        lastName: 'Trello',
        email: 'jason@gmail.com',
        password: '555SSS777',
        address: '321 upper crest park, New York, USA',
        isAdmin: true
      };

      var user = _user["default"].createUser(data);

      expect(user).to.have.property('id');
      expect(user).to.have.property('email').eq(data.email);
      expect(user.first_name).to.equal(data.firstName);
      expect(user.last_name).to.equal(data.lastName);
    });
  });
  describe('Get all users', function () {
    it('should return all users', function () {
      _user["default"].users = _users["default"];

      var allUsers = _user["default"].getAllUsers();

      expect(allUsers).to.be.an('Array');
      expect(allUsers.length).to.eq(_users["default"].length);
    });
  });
  describe('Get user by first_name', function () {
    it('should return a user\'s first_name', function () {
      _user["default"].users = _users["default"];

      var user = _user["default"].findByFirstName('Jason');

      expect(user).to.have.property('first_name').to.eq('Jason');
    });
  });
  describe('Get user by email', function () {
    it('should return a user\'s email', function () {
      _user["default"].users = _users["default"];

      var user = _user["default"].findByEmail('jason@gmail.com');

      expect(user).to.have.property('email').to.equal('jason@gmail.com');
    });
  });
  describe('Get a User', function () {
    it('should return a user based on id', function () {
      _user["default"].users = _users["default"];
      var userId = _users["default"][0].id;

      var user = _user["default"].getUser(userId);

      expect(user).to.be.an('Object');
      expect(user).to.have.property('id').eq(_users["default"][0].id);
    });
  });
  describe('Get Admin User', function () {
    it('should check for an admin', function () {
      _user["default"].users = _users["default"];
      _users["default"][0].is_admin = true;
      var admin = _users["default"][0];
      expect(admin).to.be.a('object');
      expect(admin.is_admin).to.equal(true);
    });
  });
  describe('Delete User', function () {
    it('should delete a user', function () {
      _users["default"][0].status = 'registered';
      _user["default"].users = _users["default"];

      var deletedUser = _user["default"].deleteUser(_users["default"][0]);

      expect(deletedUser.status).to.eq(undefined);
    });
  });
  describe('Log in User', function () {
    it('should login a user', function () {
      _users["default"][1].status = 'registered';
      _user["default"].users = _users["default"];

      var loggedUser = _user["default"].loginUser(_users["default"][1].id);

      expect(loggedUser[0].id).to.eq(_users["default"][1].id);
      expect(loggedUser.status).to.eq('loggedIn');
    });
  });
});