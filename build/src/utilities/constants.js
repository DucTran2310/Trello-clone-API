"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WHITELIST_DOMAIN = exports.HttpStatusCode = void 0;
var HttpStatusCode = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500
};
exports.HttpStatusCode = HttpStatusCode;
var WHITELIST_DOMAIN = ['http://localhost:3000', 'https://trello-clone-661c3.web.app', 'https://trello-clone-661c3.firebaseapp.com'];
exports.WHITELIST_DOMAIN = WHITELIST_DOMAIN;