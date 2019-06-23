"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.allFlags = exports.createFlag = void 0;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var allFlags = [];
exports.allFlags = allFlags;

var createFlag = function createFlag(data) {
  var id = parseInt(allFlags.length, 10);

  var flagData = _objectSpread({
    id: id
  }, data);

  allFlags.push(flagData);
  return flagData;
};

exports.createFlag = createFlag;