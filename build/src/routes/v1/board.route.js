"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.boardRoutes = void 0;

var _express = _interopRequireDefault(require("express"));

var _board = require("../../controllers/board.controller");

var _board2 = require("../../validations/board.validation");

var router = _express["default"].Router(); // GET list of board


router.route('/').post(_board2.BoardValidation.createNew, _board.BoardController.createNew); // GET list of board

router.route('/:id').get(_board.BoardController.getFullBoard).put(_board2.BoardValidation.update, _board.BoardController.update);
var boardRoutes = router;
exports.boardRoutes = boardRoutes;