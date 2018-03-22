var express = require("express");
var router = express.Router();
var Users = require("../models/user");
var multer = require("multer");
var path = require("path");
var fs = require("fs");

var defaultAvatar = "/public/img/placeholder-avatar.jpeg";
var upload = multer({storage: multer.diskStorage({
  destination: function(req, file, callback){
    callback(null, "public/img/usr");
  },
  filename: function(req, file, callback){
    callback(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  }})
});


//===============
// USER LIST ROUTE
//===============
router.get("/", function(req, res){
  Users.find({}, function(err, users){
    if (err){
      console.log(err);
    } else {
      res.render("user/users", {users:users});
    }
  });
});


//==============
// USER SHOW ROUTE
//==============

router.get("/:id", function(req, res){
  Users.findById(req.params.id).populate("attending").populate("uploads").exec(function(err, foundUser){
    if (err){
      console.log(err);
    } else {
      foundUser.attending.sort(tools.upcomingSort);
      foundUser.uploads.sort(tools.popularSort);
      res.render("user/profile", {user: foundUser});
    }
  });
});
//================
//User Edit Route
//================
router.get("/:id/edit", function(req, res){
  Users.findById(req.params.id, function(err, user){
    res.render("user/edit", {user: user});
  });
});

router.put("/:id", upload.single("avatar"), function(req, res){
  Users.findById(req.params.id, function(err, user){
    var avatarPath = "public/"+ user.avatar;
    if (err){
      console.log(err);
    } else {
    if(req.file){
      if(user.avatar != defaultAvatar){
        //Deleting Current Avatar
        fs.unlinkSync(avatarPath);
      }
      user.avatar = req.file.path.slice(6);
    } else{ //User did not upload new avatar
      user.avatar = user.avatar
    }
    //Updating user information from form
    user.bio = req.body.update.bio;
    user.socialmedia.twitter = req.body.update.twitter;
    user.socialmedia.instagram = req.body.update.instagram;
    user.socialmedia.tumblr = req.body.update.tumblr;
    user.socialmedia.facebook = req.body.update.facebook;
    user.save();
    res.redirect("/");
  }
});
})

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
