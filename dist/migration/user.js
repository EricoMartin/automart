"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _queries = _interopRequireDefault(require("./queries"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var User =
/*#__PURE__*/
function () {
  function User() {
    _classCallCheck(this, User);
  }

  _createClass(User, null, [{
    key: "createUser",
    value: function createUser(data) {
      var text = 'INSERT INTO users (first_name, last_name, address, is_admin, email, status, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING first_name, last_name, address, is_admin, email, status';
      return _queries["default"].query(text, data);
    }
  }, {
    key: "getAllUsers",
    value: function getAllUsers() {
      return _queries["default"].query('SELECT (id, first_name, last_name, address, is_admin, email, status, password) FROM users LIMIT 50');
    }
  }, {
    key: "findByEmail",
    value: function findByEmail(email) {
      var query = 'SELECT * FROM users WHERE email=$1';
      return _queries["default"].query(query, [email]);
    }
  }, {
    key: "findEmail",
    value: function findEmail(email) {
      var query = 'SELECT email FROM users WHERE email=$1';
      return _queries["default"].query(query, [email]);
    }
  }, {
    key: "findByFirstName",
    value: function findByFirstName(id) {
      var name = 'SELECT first_name FROM users WHERE id=$1';
      return _queries["default"].query(name, [id]);
    }
  }, {
    key: "findByPass",
    value: function findByPass(id) {
      var query = 'SELECT password FROM users WHERE id=$1';
      return _queries["default"].query(query, [id]);
    }
  }, {
    key: "changePassword",
    value: function changePassword(data) {
      var text = 'UPDATE users SET password=$1 WHERE id=$2 RETURNING id, first_name, last_name, email, status';
      return _queries["default"].query(text, data);
    }
  }]);

  return User;
}();

var _default = User;
exports["default"] = _default;