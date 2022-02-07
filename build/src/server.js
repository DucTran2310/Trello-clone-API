"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _mongodb = require("./config/mongodb");

var _environment = require("./config/environment");

var _v = require("./routes/v1");

// const hostName = 'localhost'
// const port = 8080
(0, _mongodb.connectDB)().then(function () {
  return console.log('Connected Successfully to database server');
}).then(function () {
  return bootServer();
})["catch"](function (error) {
  console.log(error); // stop app

  process.exit(1);
});

var bootServer = function bootServer() {
  var app = (0, _express["default"])();
  app.use((0, _cors["default"])(_mongodb.corsOptions)); // Enable req.body data

  app.use(_express["default"].json());
  app.use(_express["default"].urlencoded({
    extended: true
  })); // Use APIs v1

  app.use('/v1', _v.apiV1); // app.listen(env.APP_PORT, env.APP_HOST, (req, res) => {
  //   console.log(`Hello ADSTAR, Running at ${env.APP_HOST}:${env.APP_PORT}/`)
  // })
  // Support heroku deploy

  var PORT = process.env.PORT || 8080;
  app.listen(PORT, function () {
    console.log("Server is running ".concat(PORT));
  });
};