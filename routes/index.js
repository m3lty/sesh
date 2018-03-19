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
            res.render("home", {allSpots:allSpots});         
        }

    })

});

//==========================
// NEW USER PAGE ROUTE
//==========================
router.get("/register", function(req,res){
    if(!req.isAuthenticated()){
      res.render("register");
    } else {
      res.redirect("/")
    }
  
  });
  //===================
  // NEW USER POST
  //===================
  router.post("/register", function(req, res){
  
    var newUser = new User({
      username: req.body.username,
      email: req.body.email,
      birthday:req.body.birthday
    });
    User.register(newUser, req.body.password, function(err, user){
      if(err){
        console.log(err);
        return res.redirect("back");
      }
      passport.authenticate("local")(req, res, function(){
        console.log("User " + req.body.username + " registered at " + Date.now());
        res.redirect("/");
      });
    });
  
  });
  
  //login logic
  router.get("/login", function(req,res){
    res.render("login");
  });
  
  router.post("/login", userToLowerCase, passport.authenticate("local", {
    successRedirect: "back",
    failureRedirect: "back"
  }), function(req, res){
  
    User.findOne({ username: username.toLowerCase() }).exec(callback)
  
  });
  
  //logout logic
  router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
  });

  function userToLowerCase(req, res, next){
    req.body.username = req.body.username.toLowerCase();
    next();
  }
module.exports = router;


