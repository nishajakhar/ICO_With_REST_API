const Express = require("express");
const express = Express();
const bodyparser = require("body-parser");
const tokenRoute = require("./api/routes/token");

express.use(bodyparser.json());
express.use('/',tokenRoute);


module.exports = express;