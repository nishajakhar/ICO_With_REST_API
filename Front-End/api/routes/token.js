const express = require("express");
const router = express.Router();
const tokenFunc = require("../models/tokenFunc");


router.get('/checkBalance/:address',tokenFunc.checkBalance);

router.post('/tranfer', tokenFunc.transfer);

module.exports = router;