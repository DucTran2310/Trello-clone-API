"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapOrder = void 0;

/**
 * ---
 * Order an array of objects based on another array order
 * ---
 */
var mapOrder = function mapOrder(array, order, key) {
  array.sort(function (a, b) {
    return order.indexOf(a[key]) - order.indexOf(b[key]);
  });
  return array;
};

exports.mapOrder = mapOrder;