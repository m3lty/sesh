var express = require("express");
var router = express.Router();
var path = require("path");
var fs = require("fs");
var passport = require("passport");

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
let authObj = {
    table:[]
};

//===================
// Registration POST
// Initiall only takes Username, Email and Password
// Should redirect to Profile fleshing out if profiles are a thing
//===================
  router.post("/register", function(req, res){
  
    var newUser = new User({
      username: req.body.username,
      email: req.body.email,
      displayName: req.body.username
    });
    User.register(newUser, req.body.password, function(err, user){
      if(err){
        console.log(err);
        return res.redirect("back");
      }
      passport.authenticate("local")(req, res, function(){
        console.log("User " + req.body.username + " registered at " + Date.now());
        res.redirect("users/" + user._id);
      });
    });
  
  });
  //LOGIN POST 
  router.post("/login", userToLowerCase, passport.authenticate("local", {
    
    failureRedirect: "back"
  }), function(req, res){
    console.log(req.user.username + " has logged in from" + req.connection.remoteAddress)
    res.redirect("/");
  });


  function userToLowerCase(req, res, next){
    req.body.username = req.body.username.toLowerCase();
    next();
  }
module.exports = router;