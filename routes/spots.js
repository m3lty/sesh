var express = require("express");
var router = express.Router();
var middleware = require("../middleware");
var mongoose = require("mongoose");
var multer = require("multer");
var path = require("path");
var fs = require("fs");
var states = fs.readFileSync("states.txt").toString();
var stateList = states.split("\r\n");
var Spots = require("../models/spot");

//Image upload
var upload = multer({storage: multer.diskStorage({
    destination: function(req, file, callback){
      callback(null, "public/img/spots");
    },
    filename: function(req, file, callback){
      callback(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }})
  });
//New Spot logic
router.get("/newspot",middleware.isLoggedIn, function(req, res){
    res.render("spots/newspot", {stateList:stateList});
});
// NEW SPOT POST
//================================
router.post("/", middleware.isLoggedIn, upload.single("spotImg"), function(req, res){
    var newSpot = new Spots({
        name: req.body.spotName,
        lat: req.body.lat,
        lng: req.body.long,
        mainImg: req.file.path.slice(6),
        address: {
            addr1:req.body.addr1,
            city: req.body.city,
            zip: req.body.zip,
            state: "PA",
            geo: req.body.addr1 + " " + 
                req.body.city + " PA " + req.body.zip,     
        },
        author: {
            id: req.user._id, 
            username:req.user.username
        }
    });
    console.log(newSpot.address.geo);

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
//==================
//DELETE SPOT ROUTE
//==================
router.delete("/:id", middleware.checkOwnership, function(req, res){
    Spots.findByIdAndRemove(req.params.id, function(err){
      if(err){
        console.log(err);
        res.redirect("/");
      } else {
        console.log("Something was deleted.");
        res.redirect("/");
      }
    })
  });
//EDIT SPOT
router.get("/:id/edit", middleware.checkOwnership, function(req, res){
    Spots.findById(req.params.id, function(err, spot){
    res.render("spots/edit", {spot:spot});
  });
});
//UPDATE SPOT
router.put("/:id",middleware.checkOwnership, function(req, res){
  //find and update convention and redir
  Spots.findByIdAndUpdate(req.params.id, req.body.spot, function(err, updatedSpot){
    if(err){
      res.redirect("/");
    } else {
        console.log(req.body.convention);
        res.redirect("/spots/" + req.params.id);

    }
  });
});


module.exports = router;