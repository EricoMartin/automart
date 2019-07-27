"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _flag = _interopRequireDefault(require("../migration/flag"));

var _validateData = _interopRequireDefault(require("../middlewares/validateData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Flag = {
  createFlag: function () {
    var _createFlag = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res) {
      var _req$body, user_id, car_id, reason, description, props, _ref, rows, flagger, created_on, status, cardata, flagCreated;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _req$body = req.body, user_id = _req$body.user_id, car_id = _req$body.car_id, reason = _req$body.reason, description = _req$body.description;
              props = [user_id, car_id, reason, description];

              if ((0, _validateData["default"])(props, req.body)) {
                _context.next = 5;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                status: 400,
                message: 'All fields must be filled'
              }));

            case 5:
              if (!(reason === '' || reason.match(/\s/g).length > 30 || description.match(/\s/g).length > 60)) {
                _context.next = 7;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                status: 400,
                message: 'Note that reason and description cannot be more than 60 words'
              }));

            case 7:
              _context.next = 9;
              return _flag["default"].getOwner(car_id);

            case 9:
              _ref = _context.sent;
              rows = _ref.rows;

              if (!(rows.length > 0)) {
                _context.next = 13;
                break;
              }

              return _context.abrupt("return", res.status(406).json({
                status: 406,
                message: 'You have reported this ad'
              }));

            case 13:
              car_id = parseInt(car_id, 10);
              user_id = parseInt(user_id, 10);
              reason = reason.trim().replace(/\s+/g, ' ');
              description = description.trim().replace(/\s+/g, '');
              flagger = user_id;
              created_on = Date.Now();
              status = 'reported';
              cardata = [car_id, created_on, reason, description, status, flagger];
              _context.next = 23;
              return _flag["default"].createdFlag(cardata);

            case 23:
              flagCreated = _context.sent;
              return _context.abrupt("return", res.status(201).json({
                status: 201,
                data: {
                  id: flagCreated.rows[0].id
                }
              }));

            case 27:
              _context.prev = 27;
              _context.t0 = _context["catch"](0);
              res.status(_context.t0.statusCode || 500).json(_context.t0.message);

            case 30:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 27]]);
    }));

    function createFlag(_x, _x2) {
      return _createFlag.apply(this, arguments);
    }

    return createFlag;
  }(),
  updateFlagStatus: function () {
    var _updateFlagStatus = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res) {
      var flag, updatedFlag;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _flag["default"].findFlag(req.params.flag_id);

            case 3:
              flag = _context2.sent;

              if (flag) {
                _context2.next = 6;
                break;
              }

              return _context2.abrupt("return", res.status(404).json({
                status: 404,
                message: 'Flag not found'
              }));

            case 6:
              if (!(role !== isAdmin)) {
                _context2.next = 8;
                break;
              }

              return _context2.abrupt("return", res.status(401).json({
                status: 401,
                message: 'You dont have the permission to access this resource'
              }));

            case 8:
              _context2.next = 10;
              return _flag["default"].updateFlagStatus(req.params.flag - id);

            case 10:
              updatedFlag = _context2.sent;
              return _context2.abrupt("return", res.status(200).json({
                status: 200,
                data: updatedFlag.rows[0]
              }));

            case 14:
              _context2.prev = 14;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", res.status(_context2.t0.statusCode || 500).json(_context2.t0.message));

            case 17:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 14]]);
    }));

    function updateFlagStatus(_x3, _x4) {
      return _updateFlagStatus.apply(this, arguments);
    }

    return updateFlagStatus;
  }(),
  getAllFlags: function () {
    var _getAllFlags = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(req, res) {
      var flags;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _flag["default"].getAllFlags();

            case 3:
              flags = _context3.sent;

              if (flags) {
                _context3.next = 6;
                break;
              }

              return _context3.abrupt("return", res.status(404).json({
                status: 404,
                message: 'There are no flags now'
              }));

            case 6:
              return _context3.abrupt("return", res.status(200).json({
                status: 200,
                data: flags.rows[0]
              }));

            case 9:
              _context3.prev = 9;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", res.status(_context3.t0.statusCode || 500).json(_context3.t0.message));

            case 12:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 9]]);
    }));

    function getAllFlags(_x5, _x6) {
      return _getAllFlags.apply(this, arguments);
    }

    return getAllFlags;
  }(),
  deleteFlag: function () {
    var _deleteFlag = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(req, res) {
      var flagger, flagDelete;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _flag["default"].findFlag(req.params.flag_id);

            case 2:
              flagger = _context4.sent;

              if (flagger) {
                _context4.next = 5;
                break;
              }

              return _context4.abrupt("return", res.status(404).json({
                status: 404,
                message: 'The flag is no longer available'
              }));

            case 5:
              _context4.next = 7;
              return _flag["default"].deleteFlag(req.params.flag_id);

            case 7:
              flagDelete = _context4.sent;

              if (flagDelete) {
                _context4.next = 10;
                break;
              }

              return _context4.abrupt("return", res.status(500).json({
                status: 500,
                message: 'error processing request. Try again later'
              }));

            case 10:
              return _context4.abrupt("return", res.status(200).json({
                status: 200,
                message: 'Flag successfully deleted'
              }));

            case 11:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    function deleteFlag(_x7, _x8) {
      return _deleteFlag.apply(this, arguments);
    }

    return deleteFlag;
  }()
};
var _default = Flag;
exports["default"] = _default;