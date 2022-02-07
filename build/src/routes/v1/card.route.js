"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cardRoutes = void 0;

var _express = _interopRequireDefault(require("express"));

var _card = require("../../controllers/card.controller");

var _card2 = require("../../validations/card.validation");

var router = _express["default"].Router();

router.route('/').post(_card2.CardValidation.createNew, _card.CardController.createNew);
router.route('/:id').put(_card2.CardValidation.update, _card.CardController.update);
var cardRoutes = router;
exports.cardRoutes = cardRoutes;