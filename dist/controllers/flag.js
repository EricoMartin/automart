"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _flag = _interopRequireDefault(require("../models/flag"));

var _validateData = _interopRequireDefault(require("../middlewares/validateData"));

var _users = _interopRequireDefault(require("../test/mock_db/users"));

var _ErrorClass = _interopRequireDefault(require("../helpers/ErrorClass"));

var _SuccessClass = _interopRequireDefault(require("../helpers/SuccessClass"));

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
    key: "createFlag",
    value: function createFlag(req, res) {
      try {
        var _req$body = req.body,
            user_id = _req$body.user_id,
            car_id = _req$body.car_id,
            reason = _req$body.reason,
            description = _req$body.description;
        var props = [user_id, car_id, reason, description];

        if (!(0, _validateData["default"])(props, req.body)) {
          return res.status(400).json({
            status: 400,
            message: 'All fields must be filled'
          });
        }

        if (reason === '' || reason.match(/\s/g).length > 60 || description.match(/\s/g).length > 60) {
          return res.status(400).json({
            status: 400,
            message: 'Note that reason and description cannot be more than 60 words'
          });
        }

        car_id = parseInt(car_id, 10);
        user_id = parseInt(user_id, 10);
        reason = reason.trim().replace(/\s+/g, ' ');
        description = description.trim().replace(/\s+/g, ''); //user_id = user_id.trim().replace(/\s+/g, '');

        var flagCreated = _flag["default"].createdFlag(req.body);

        return res.status(201).json({
          status: 201,
          data: {
            id: flagCreated.id,
            user_id: flagCreated.user_id,
            car_id: flagCreated.car_id,
            reason: flagCreated.reason,
            description: flagCreated.description,
            status: flagCreated.status
          }
        });
      } catch (error) {
        res.status(error.statusCode || 500).json(error.message);
      }
    }
  }, {
    key: "updateFlagStatus",
    value: function updateFlagStatus(req, res) {
      var flag = _flag["default"].findFlag(req.params.flag - id);

      if (!flag) {
        return res.status(404).json({
          status: 404,
          message: 'Flag not found'
        });
      }

      if (role !== isAdmin) {
        return res.status(401).json({
          status: 401,
          message: 'You dont have the permission to access this resource'
        });
      }

      var updatedFlag = _flag["default"].updateFlagStatus(req.params.flag - id);

      return res.status(200).json({
        status: 200,
        data: updatedFlag
      });
    }
  }, {
    key: "getAllFlags",
    value: function getAllFlags(req, res) {
      var flags = _flag["default"].getAllFlags();

      if (!flags) {
        return res.status(404).json({
          status: 404,
          message: 'There are no flags now'
        });
      }

      return res.status(200).json({
        status: 200,
        data: flags
      });
    }
  }, {
    key: "deleteFlag",
    value: function deleteFlag(req, res) {
      var flagger = _flag["default"].findFlag(req.params.flag - id);

      if (!flagger) {
        return res.status(404).json({
          status: 404,
          message: 'The flag is no longer available'
        });
      }

      return res.status(200).json({
        status: 200,
        message: 'Flag successfully deleted'
      });
    }
  }]);

  return Flag;
}();

var _default = Flag;
exports["default"] = _default;