"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardModel = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _joi = _interopRequireDefault(require("joi"));

var _mongodb = require("mongodb");

var _mongodb2 = require("../config/mongodb");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

// Define Card Collection
var cardCollectionName = 'cards';

var cardCollectionSchema = _joi["default"].object({
  boardId: _joi["default"].string().required(),
  columnId: _joi["default"].string().required(),
  title: _joi["default"].string().required().min(3).max(20).trim(),
  // columnOrder la 1 array, moi item ben trong no co kieu du lieu gi
  cover: _joi["default"].string()["default"](null),
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
            return cardCollectionSchema.validateAsync(data, {
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
    var validatedValue, valueInsert, result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return validateSchema(data);

          case 3:
            validatedValue = _context2.sent;
            //Clone lại value và ghi đè id từ string -> ObjectId
            valueInsert = _objectSpread(_objectSpread({}, validatedValue), {}, {
              boardId: (0, _mongodb.ObjectId)(validatedValue.boardId),
              columnId: (0, _mongodb.ObjectId)(validatedValue.columnId)
            });
            _context2.next = 7;
            return (0, _mongodb2.getDB)().collection(cardCollectionName).insertOne(valueInsert);

          case 7:
            result = _context2.sent;
            _context2.next = 10;
            return (0, _mongodb2.getDB)().collection(cardCollectionName).findOne(result.insertedId);

          case 10:
            return _context2.abrupt("return", _context2.sent);

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](0);
            throw new Error(_context2.t0);

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 13]]);
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

            if (data.columnId) {
              updateData.columnId = (0, _mongodb.ObjectId)(data.columnId);
            }

            _context3.next = 6;
            return (0, _mongodb2.getDB)().collection(cardCollectionName).findOneAndUpdate( // tìm phần tử theo id
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

          case 6:
            result = _context3.sent;
            return _context3.abrupt("return", result.value);

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](0);
            throw new Error(_context3.t0);

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 10]]);
  }));

  return function update(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 *
 * @param {Array of string card id} ids
 */


var deleteMany = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(ids) {
    var transformIds, result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            //Chuyển đổi các phần tử id:string -> id:object trong mảng ids
            transformIds = ids.map(function (i) {
              return (0, _mongodb.ObjectId)(i);
            }); //Await đến hàm GetDB rồi insert cái value đã validate vào

            _context4.next = 4;
            return (0, _mongodb2.getDB)().collection(cardCollectionName).updateMany({
              _id: {
                $in: transformIds
              }
            }, //Update những _id nào nằm trong mảng ids
            {
              $set: {
                _destroy: true
              }
            } //Update lại _destroy = true
            );

          case 4:
            result = _context4.sent;
            return _context4.abrupt("return", result);

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](0);
            throw new Error(_context4.t0);

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 8]]);
  }));

  return function deleteMany(_x5) {
    return _ref4.apply(this, arguments);
  };
}();

var CardModel = {
  cardCollectionName: cardCollectionName,
  createNew: createNew,
  update: update,
  deleteMany: deleteMany
};
exports.CardModel = CardModel;