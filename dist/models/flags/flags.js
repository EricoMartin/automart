"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.allFlags = exports.createFlag = void 0;
var allFlags = [];
exports.allFlags = allFlags;

var createFlag = function createFlag(data) {
  var id = parseInt(allFlags.length);
  var flagData = {
    id: id,
    createdOn: new Date(),
    reason: null,
    description: null
  };
  allFlags.push(flagData);
  return flagData;
};

exports.createFlag = createFlag;