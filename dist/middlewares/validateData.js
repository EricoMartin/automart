"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var validData = function validData(property, data) {
  return property.find(function (idx) {
    return data[idx] === undefined || data[idx] === '';
  });
};

var _default = validData;
exports["default"] = _default;