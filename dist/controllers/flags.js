"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _model = _interopRequireDefault(require("../models/model/model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Flags = _model["default"].Flags;
/*
  * @description - creates a new flag
   * @params {object}
   * @returns {object}
   */

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
            carId = _req$body.carId,
            reason = _req$body.reason,
            description = _req$body.description;
        carId = parseInt(carId, 10);
        reason = reason.trim().replace(/\s+/g, ' ');
        description = description.trim().replace(/\s+/g, ' ');
        var createdFlag = Flags.createFlag({
          carId: carId,
          reason: reason,
          description: description
        });
        return res.status(201).json({
          status: 201,
          data: {
            id: createdFlag.id,
            car_id: createdFlag.carId,
            reason: createdFlag.reason,
            description: createdFlag.description
          }
        });
      } catch (error) {
        res.status(error.statusCode || 500).json(error.message);
      }
    }
  }]);

  return Flag;
}();

var _default = Flag;
exports["default"] = _default;