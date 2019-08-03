"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _users = _interopRequireDefault(require("../test/mock_db/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createUser = function createUser(data) {
  var userData = {
    token: data.token,
    id: data.id || parseInt(_users["default"].length + 1, 10),
    email: data.email || '',
    first_name: data.firstName || '',
    last_name: data.lastName || '',
    password: data.password || '',
    address: data.address || '',
    is_admin: data.isAdmin || false,
    status: data.status || ''
  };

  _users["default"].push(userData);

  return userData;
};

var getAllUsers = function getAllUsers() {
  return _users["default"];
};

var findByFirstName = function findByFirstName(firstName) {
  return _users["default"].find(function (user) {
    return user.first_name === firstName;
  });
};

var findByEmail = function findByEmail(email) {
  return _users["default"].find(function (user) {
    return user.email === email;
  });
};

var findByEmailPass = function findByEmailPass(email, password) {
  return _users["default"].find(function (user) {
    return user.email === email && user.password === password;
  });
};

var getUser = function getUser(id) {
  return _users["default"].find(function (user) {
    return user.id === id;
  });
};

var deleteUser = function deleteUser(userdata) {
  var idx = _users["default"].indexOf(userdata);

  return _users["default"].splice(idx, 1);
};

var loginUser = function loginUser(id) {
  var logUser = _users["default"].filter(function (user) {
    return parseInt(user.id, 10) === parseInt(id, 10);
  });

  logUser.status = 'loggedIn';
  return logUser;
};

var changePassword = function changePassword(id, newPassword) {
  var userPassword = _users["default"].getUser(id);

  userPassword.password = newPassword || userPassword.password;
  return userPassword;
};

var createAdmin = function createAdmin(userId) {
  var adminUser = _users["default"].getUser(userId);

  adminUser.isAdmin = true;
  return adminUser;
};

var _default = {
  createUser: createUser,
  getUser: getUser,
  getAllUsers: getAllUsers,
  deleteUser: deleteUser,
  loginUser: loginUser,
  findByEmail: findByEmail,
  findByEmailPass: findByEmailPass,
  findByFirstName: findByFirstName,
  changePassword: changePassword,
  createAdmin: createAdmin
};
exports["default"] = _default;