"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BoardModel = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _joi = _interopRequireDefault(require("joi"));

var _mongodb = require("mongodb");

var _mongodb2 = require("../config/mongodb");

var _column = require("./column.model");

var _card = require("./card.model");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

// Define Board Collection
var boardCollectionName = 'boards';

var boardCollectionSchema = _joi["default"].object({
  title: _joi["default"].string().required().min(3).max(20).trim(),
  // columnOrder la 1 array, moi item ben trong no co kieu du lieu gi
  columnOrder: _joi["default"].array().items(_joi["default"].string())["default"]([]),
  createdAt: _joi["default"].date().timestamp()["default"](Date.now()),
  updatedAt: _joi["default"].date().timestamp()["default"](null),
  _destroy: _joi["default"]["boolean"]()["default"](false)
});

var validateSchema = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return boardCollectionSchema.validateAsync(data, {
              abortEarly: false
            });

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function validateSchema(_x) {
    return _ref.apply(this, arguments);
  };
}();

var createNew = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(data) {
    var value, result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return validateSchema(data);

          case 3:
            value = _context2.sent;
            _context2.next = 6;
            return (0, _mongodb2.getDB)().collection(boardCollectionName).insertOne(value);

          case 6:
            result = _context2.sent;
            _context2.next = 9;
            return (0, _mongodb2.getDB)().collection(boardCollectionName).findOne(result.insertedId);

          case 9:
            return _context2.abrupt("return", _context2.sent);

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](0);
            throw new Error(_context2.t0);

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 12]]);
  }));

  return function createNew(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var update = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(id, data) {
    var updateData, result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            updateData = _objectSpread({}, data); //Kiểm tra nếu data đẩy lên server có tồn tại boardId thì convert boardId từ string -> objectID

            if (data.boardId) {
              updateData.boardId = (0, _mongodb.ObjectId)(data.boardId);
            }

            _context3.next = 5;
            return (0, _mongodb2.getDB)().collection(boardCollectionName).findOneAndUpdate( // tìm phần tử theo id
            {
              _id: (0, _mongodb.ObjectId)(id)
            }, //tìm đến id của board cần update
            {
              $set: updateData
            }, //data update từ service truyền qua
            {
              returnDocument: 'after'
            } //trả về bản ghi đã update, true -> bản ghi chưa update
            );

          case 5:
            result = _context3.sent;
            return _context3.abrupt("return", result.value);

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](0);
            throw new Error(_context3.t0);

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 9]]);
  }));

  return function update(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 *
 * @param {string} boardId
 * @param {string} columnId
 */


var pushColumnOrder = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(boardId, columnId) {
    var result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return (0, _mongodb2.getDB)().collection(boardCollectionName).findOneAndUpdate({
              _id: (0, _mongodb.ObjectId)(boardId)
            }, //tìm đến id của board cần update
            {
              $push: {
                columnOrder: columnId
              }
            }, //push columnId vừa tạo vào columnOrder Array
            {
              returnDocument: 'after'
            } //trả về bản ghi đã update, true -> bản ghi chưa update
            );

          case 3:
            result = _context4.sent;
            return _context4.abrupt("return", result.value);

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            throw new Error(_context4.t0);

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 7]]);
  }));

  return function pushColumnOrder(_x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();

var getFullBoard = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(boardId) {
    var result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return (0, _mongodb2.getDB)().collection(boardCollectionName).aggregate([{
              //So sánh _id trong db với id truyền vào, lọc _destroy: false->lookup
              $match: {
                _id: (0, _mongodb.ObjectId)(boardId),
                _destroy: false
              }
            }, {
              $lookup: {
                from: _column.ColumnModel.columnCollectionName,
                //collection name
                localField: '_id',
                //lấy ra cái _id vừa match được
                foreignField: 'boardId',
                // Key của collection -> so sánh với localField
                as: 'columns' //Key để hiển thị ra trong json

              }
            }, {
              $lookup: {
                from: _card.CardModel.cardCollectionName,
                //collection name
                localField: '_id',
                //lấy ra cái _id vừa match được
                foreignField: 'boardId',
                // Key của collection -> so sánh với localField
                as: 'cards' //Key để hiển thị ra trong json

              }
            }]).toArray();

          case 3:
            result = _context5.sent;
            return _context5.abrupt("return", result[0] || {});

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](0);
            throw new Error(_context5.t0);

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 7]]);
  }));

  return function getFullBoard(_x7) {
    return _ref5.apply(this, arguments);
  };
}();

var BoardModel = {
  createNew: createNew,
  update: update,
  pushColumnOrder: pushColumnOrder,
  getFullBoard: getFullBoard
};
exports.BoardModel = BoardModel;