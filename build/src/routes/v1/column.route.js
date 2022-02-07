"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.columnRoutes = void 0;

var _express = _interopRequireDefault(require("express"));

var _column = require("../../controllers/column.controller");

var _column2 = require("../../validations/column.validation");

var router = _express["default"].Router();

router.route('/').post(_column2.ColumnValidation.createNew, _column.ColumnController.createNew);
router.route('/:id').put(_column2.ColumnValidation.update, _column.ColumnController.update);
var columnRoutes = router;
exports.columnRoutes = columnRoutes;