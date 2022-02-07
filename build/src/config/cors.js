"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.corsOptions = void 0;

var _constants = require("../utilities/constants");

var corsOptions = {
  origin: function origin(_origin, callback) {
    // whilelist co origin
    if (_constants.WHITELIST_DOMAIN.indexOf(_origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("".concat(_origin, " not allowed by CORS.")));
    }
  },
  optionsSuccessStatus: 200
};
exports.corsOptions = corsOptions;