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

var Flag =
/*#__PURE__*/
function () {
  function Flag() {
    _classCallCheck(this, Flag);
  }

  _createClass(Flag, null, [{
    key: "createdFlag",
    value: function createdFlag(data) {
      var text = 'INSERT INTO flags(id, car_id, reason, description, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
      return _queries["default"].query(text, data);
    }
  }, {
    key: "getAllFlags",
    value: function getAllFlags() {
      return _queries["default"].query('SELECT * FROM flags GROUP BY status, id');
    }
  }, {
    key: "deleteFlag",
    value: function deleteFlag(id) {
      var query = 'DELETE FROM flags WHERE id=$1 RETURNING *';
      return _queries["default"].query(query, [id]);
    }
  }, {
    key: "updateFlagStatus",
    value: function updateFlagStatus(id) {
      var text = 'UPDATE flags SET status=\'resolved\' WHERE id=$1 AND status=\'pending\' RETURNING *';
      return _queries["default"].query(text, [id]);
    }
  }, {
    key: "findFlag",
    value: function findFlag(data) {
      var query = 'SELECT id FROM flags WHERE car_id=$1';
      return _queries["default"].query(query, data);
    }
  }, {
    key: "getOwner",
    value: function getOwner(car_id) {
      var text = 'SELECT owner FROM cars WHERE id=$1 AND status=\'available\'';
      return _queries["default"].query(text, [car_id]);
    }
  }]);

  return Flag;
}();

var _default = Flag;
exports["default"] = _default;