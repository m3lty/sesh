//Will contain index page, and user creation, log in and log out

var express = require("express");
var router = express.Router();
var path = require("path");
var fs = require("fs");
var states = fs.readFileSync("states.txt").toString();
var stateList = states.split("\r\n");
var Spots = require("../models/spot");

router.get("/", function(req, res){
    Spots.find({}, function(err, allSpots){
        if(err){
            console.log(err);
        } else {
            res.render("home", {allSpots:allSpots});

        }

    })

});

module.exports = router;


