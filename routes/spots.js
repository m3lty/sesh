var express = require("express");
var router = express.Router();

var mongoose = require("mongoose");
var multer = require("multer");
var path = require("path");
var fs = require("fs");
var states = fs.readFileSync("states.txt").toString();
var stateList = states.split("\r\n");
var Spots = require("../models/spot");


var upload = multer({storage: multer.diskStorage({
    destination: function(req, file, callback){
      callback(null, "public/img/spots");
    },
    filename: function(req, file, callback){
      callback(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }})
  });
//New Spot logic
router.get("/newspot", function(req, res){
    res.render("newspot", {stateList:stateList});
});

router.post("/", upload.single("spotImg"), function(req, res){
    var newSpot = new Spots({
        name: req.body.spotName,
        lat: req.body.lat,
        lng: req.body.long,
        img: req.file.path.slice(6),
        state: req.body.state
    });

    Spots.create(newSpot, function(err, newSpot){
        if (err){
            console.log("Trying to POST");
            console.log(err);
        } else {
            console.log(newSpot.name + " was added in " + newSpot.state);
            res.redirect("/");
        }
    })
});
//==============================================



//Display Page for Specific Spot
router.get("/:id", function(req, res){
    Spots.findById(req.params.id).exec(function(err, foundSpot){
        if (err){
            console.log(err);
        } else {
            res.render("spots/show", {spot:foundSpot});
        }
    });
});


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



module.exports = router;