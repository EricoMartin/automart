"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.allUsers = exports.findEmail = exports.createUser = void 0;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var allUsers = [];
exports.allUsers = allUsers;

var createUser = function createUser() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  if (!data) {
    throw new Error('Please enter a user object');
  }

  var id = parseInt(allUsers.length + 1000, 10);

  var user = _objectSpread({
    id: id
  }, data, {
    isAdmin: false
  });

  allUsers.push(user);
  return user;
};

exports.createUser = createUser;

var findEmail = function findEmail(email) {
  allUsers.find(function (user) {
    return user.email === email;
  });
};

exports.findEmail = findEmail;