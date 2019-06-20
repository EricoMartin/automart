"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.allUsers = exports.findEmail = exports.createUser = void 0;
var allUsers = [];
exports.allUsers = allUsers;

var createUser = function createUser() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  if (!data) {
    throw new Error('Please enter a user object');
  }

  var id = parseInt(allUsers.length + 1000, 10);
  var user = {
    id: id,
    email: null,
    firstName: null,
    lastName: null,
    password: null,
    address: null,
    isAdmin: false,
    createdAt: new Date(),
    updatedAt: new Date()
  };
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