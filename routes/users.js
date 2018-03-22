var express = require("express");
var router = express.Router();
var Users = require("../models/user");
var multer = require("multer");
var path = require("path");
var fs = require("fs");
var passport = require("passport");
var Spots = require("../models/spot");
var middleware = require("../middleware/index");
var upload = multer({storage: multer.diskStorage({
    destination: function(req, file, callback){
      callback(null, "public/img/usr");
    },
    filename: function(req, file, callback){
      callback(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }})
  });

var defaultAvatar = "/public/img/placeholder-avatar.jpeg";

//==============
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
      res.render("users/show", {user: foundUser});
    }
  });
});
//================
//User Edit Route
//================
router.get("/:id/edit", function(req, res){
  Users.findById(req.params.id, function(err, user){
    if (err){
      console.log(err);
    } else {
    res.render("users/edit", {user: user});
    }
  });
});

router.put("/:id", upload.single("avatar"), function(req, res){
  Users.findById(req.params.id, function(err, user){
    // console.log("Found user: " + user.username);
    console.log("public" + user.avatar);
    var avatarPath = "public"+ user.avatar;
    if (err){
      console.log("This is where it fucks up");
      console.log(err);
    } else {
      console.log(user.avatar);
      console.log("hmm");
    if(req.file){
      console.log("Trying to delete User Avatar");
      if(user.avatar != defaultAvatar){
        //Deleting Current Avatar
        // fs.unlinkSync(avatarPath);

        console.log("Deleted?");
      }
      user.avatar = req.file.path.slice(6);
    } else{ //User did not upload new avatar
      user.avatar = user.avatar;
    }
    //Updating user information from form
    user.bio = req.body.update.bio;
    user.save();
    res.redirect("/");
  }
});
})

module.exports = router;
