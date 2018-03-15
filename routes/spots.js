var express = require("express");
var router = express.Router();
var path = require("path");
var fs = require("fs");
var states = fs.readFileSync("states.txt").toString();
var stateList = states.split("\r\n");
var Spots = require("../models/spot");
//Displays a page containing all Spots for a given state
router.get("/bystate/:id", function(req, res){
    Spots.find({'state':req.params.id}, function(err,localSpot){
        if(err){
            console.log(err);
        }else {
            res.render("bystate", {state:req.params.id, localSpot:localSpot});
        }
    });
});

//New Spot logic
router.get("/newspot", function(req, res){
    res.render("newspot", {stateList:stateList});
});

router.post("/newspot", function(req, res){
    var newSpot = new Spots({
        name: req.body.spotName,
        location: req.body.location,
        state: req.body.state
    });

    Spots.create(newSpot, function(err, newSpot){
        if (err){
            console.log(err);
        } else {
            console.log(newSpot.name + " was added in " + newSpot.state);
            res.redirect("/");
        }
    })
});
//==============================================


module.exports = router;