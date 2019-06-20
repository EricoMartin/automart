"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(req, res, next) {
  var _req$body = req.body,
      manufacturer = _req$body.manufacturer,
      model = _req$body.model,
      state = _req$body.state,
      year = _req$body.year,
      bodyType = _req$body.bodyType,
      price = _req$body.price;

  if (!Array.isArray(req.files.image) || req.files.image.length < 3) {
    return res.status(400).json({
      status: 400,
      error: 'Upload at least three (3) images of the car'
    });
  }

  if (!manufacturer) {
    return res.status(400).json({
      status: 400,
      error: 'Manufacturer cannot be empty'
    });
  }

  if (!model) {
    return res.status(400).json({
      status: 400,
      error: 'Model cannot be empty'
    });
  }

  if (!bodyType) {
    return res.status(400).json({
      status: 400,
      error: 'Body type cannot be empty'
    });
  }

  if (!state) {
    return res.status(400).json({
      status: 400,
      error: 'Vehicle state cannot be empty'
    });
  }

  if (!year) {
    return res.status(400).json({
      status: 400,
      error: 'Enter a valid year'
    });
  }

  if (parseInt(year, 10).toString().length < 4 || parseInt(year, 10).toString().length > 4) {
    return res.status(400).json({
      status: 400,
      error: 'Input a valid year'
    });
  }

  if (manufacturer.split('').some(function (x) {
    return Number.isInteger(parseInt(x, 10));
  })) {
    return res.status(400).json({
      status: 400,
      error: 'Manufacturer field cannot contain number(s)'
    });
  }

  if (state.split('').some(function (x) {
    return Number.isInteger(parseInt(x, 10));
  })) {
    return res.status(400).json({
      status: 400,
      error: 'Car state field cannot contain number(s)'
    });
  }

  if (Number.isNaN(parseFloat(price))) {
    return res.status(400).json({
      status: 400,
      error: 'Enter a valid price'
    });
  }

  return next();
};

exports["default"] = _default;