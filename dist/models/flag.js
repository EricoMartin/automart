"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _flags = _interopRequireDefault(require("../test/mock_db/flags"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createdFlag = function createdFlag(data) {
  var flagdata = {
    id: parseInt(_flags["default"].length + 1, 10),
    user_id: data.user_id,
    car_id: data.car_id,
    created_on: new Date().toLocaleString(),
    reason: data.reason,
    description: data.description,
    status: 'pending' //pending || resoloved || deleted

  };

  _flags["default"].push(flagdata);

  return flagdata;
};

var getAllFlags = function getAllFlags() {
  return _flags["default"];
};

var findFlag = function findFlag(id) {
  return _flags["default"].find(function (flag) {
    return parseInt(flag.id, 10) === parseInt(id, 10);
  });
};

var updateFlagStatus = function updateFlagStatus(flag_id) {
  var flagref = _flags["default"].find(function (flag) {
    return parseInt(flag.id, 10) === parseInt(flag_id, 10);
  });

  flagref.status = 'resolved';
  return flagref;
};

var deleteFlag = function deleteFlag(flagId) {
  var idx = _flags["default"].indexOf(flagId);

  var deletedFlag = _flags["default"].splice(idx, 1);

  deletedFlag.status = 'deleted';
  return deletedFlag;
};

var _default = {
  createdFlag: createdFlag,
  getAllFlags: getAllFlags,
  findFlag: findFlag,
  updateFlagStatus: updateFlagStatus,
  deleteFlag: deleteFlag,
  flagdb: _flags["default"]
};
exports["default"] = _default;