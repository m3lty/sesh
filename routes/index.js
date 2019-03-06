//Will contain index page, and user creation, log in and log out

var express = require("express");
var router = express.Router();
var Spots = require("../models/spot");
var middleware = require("../middleware/index");

//Displays Index page
router.get("/", function(req, res){
  res.render("home");
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
//==========================
// NEW USER PAGE ROUTE
//==========================
router.get("/register", function(req,res){
    if(!req.isAuthenticated()){
      res.render("users/signup");
    } else {
      res.redirect("/")
    }
 });

  
  //LOGIN PAGE - DEPRECATED 
  router.get("/login", function(req,res){
    res.render("login");
  });
  
  //logout logic
  router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
  });


module.exports = router;


