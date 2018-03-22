//Will contain index page, and user creation, log in and log out

var express = require("express");
var router = express.Router();
var path = require("path");
var fs = require("fs");
var states = fs.readFileSync("states.txt").toString();
var stateList = states.split("\r\n");
var passport = require("passport");
var Spots = require("../models/spot");
var multer = require("multer");
var middleware = require("../middleware/index");
var User = require("../models/user");
var upload = multer({storage: multer.diskStorage({
    destination: function(req, file, callback){
      callback(null, "public/img/usr");
    },
    filename: function(req, file, callback){
      callback(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }})
  });
//Displays Index page
router.get("/", function(req, res){
    Spots.find({}, function(err, allSpots){
        if(err){
            console.log(err);
        } else {
          if(!req.isAuthenticated()){
            res.render("home", {allSpots:allSpots});         
          } else {
            res.render("home", {allSpots:allSpots, user:req.User});
          }
        }

    });
});
// ==============================
// LANDING PAGE ROUTE
// ==============================
router.get("/landing", function(req,res){
  Spots.find({}, function(err, allSpots){
    if(err){
        console.log(err);
    } else {
        res.render("landing", {allSpots:allSpots});

    }
  });
})

module.exports = router;


