"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BoardValidation = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _joi = _interopRequireDefault(require("joi"));

var _constants = require("../utilities/constants");

var createNew = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var condition;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            condition = _joi["default"].object({
              title: _joi["default"].string().required().min(3).max(20).trim()
            });
            _context.prev = 1;
            _context.next = 4;
            return condition.validateAsync(req.body, {
              abortEarly: false
            });

          case 4:
            next();
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](1);
            res.status(_constants.HttpStatusCode.BAD_REQUEST).json({
              errors: new Error(_context.t0).message
            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 7]]);
  }));

  return function createNew(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var update = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var condition;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            //console.log(req.query)
            condition = _joi["default"].object({
              title: _joi["default"].string().min(3).max(20).trim(),
              columnOrder: _joi["default"].array().items(_joi["default"].string())
            });
            _context2.prev = 1;
            _context2.next = 4;
            return condition.validateAsync(req.body, {
              abortEarly: false,
              allowUnknown: true
            });

          case 4:
            //Nếu thỏa mãn condition => controller
            next();
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](1);
            //console.log(error)
            res.status(_constants.HttpStatusCode.BAD_REQUEST).json({
              errors: new Error(_context2.t0).message
            });

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 7]]);
  }));

  return function update(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var BoardValidation = {
  createNew: createNew,
  update: update
};
exports.BoardValidation = BoardValidation;