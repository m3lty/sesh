//Will contain index page, and user creation, log in and log out

var express = require("express");
var router = express.Router();
var path = require("path");
var fs = require("fs");
var states = fs.readFileSync("states.txt").toString();
var stateList = states.split("\r\n");

router.get("/", function(req, res){
    res.render("home", {stateList:stateList});

});

module.exports = router;