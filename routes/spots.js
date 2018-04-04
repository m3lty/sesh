var express = require("express");
var router = express.Router();
var middleware = require("../middleware");
var mongoose = require("mongoose");
var multer = require("multer");
var path = require("path");
var fs = require("fs");
var Spots = require("../models/spot");
var Users = require("../models/user");
var Comments = require("../models/comment");
var Photos = require("../models/photo");

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
    res.render("spots/newspot");
});
// NEW SPOT POST
//================================
router.post("/", middleware.isLoggedIn, upload.single("spotImg"), function(req, res){
    var newSpot = new Spots({
        name: req.body.spotName,
        mainImg: req.file.path.slice(6),
        address: {
            addr1:req.body.addr1,
            city: req.body.city,
            zip: req.body.zip,
            state: "PA",
            geo: req.body.addr1 + " " + 
                req.body.city + " PA " + req.body.zip,     
        },
        ratings:{
            overall:{
                total:req.body.overallRating,
                avg: req.body.overallRating
            },
            difficulty:{
                total: req.body.difficultyRating,
                avg: req.body.difficultyRating
            },
            privacy:{
                total: req.body.privacyRating,
                avg: req.body.privacyRating
            },
        },
        author: {
            id: req.user._id, 
            
        }
    });
    console.log(newSpot.address.geo);

    Spots.create(newSpot, function(err, newSpot){
        if (err){
            console.log("Trying to POST");
            console.log(err);
        } else {
            console.log(newSpot.name + " was added.");
            res.redirect("/");
        }
    });
});
//==============================================
// Add Image
//==============================================
router.post("/:id/addphoto", middleware.isLoggedIn, upload.single("spotPhotoUpload"), function(req,res){
    var newPhoto = new Photos({
        img: req.file.path.slice(6),
        spot: req.params.id,
        author:{
            id: req.user._id,
            username: req.user.username
        } 
    });
    Spots.findById(req.params.id, function(err,spot){
        spot.uploads.push(newPhoto._id);
        spot.save();
    });

    
    Photos.create(newPhoto, function(err, newPhoto){
        if(err){console.log(err);}
        res.redirect("back");
    });

});


//Display Page for Specific Spot
router.get("/:id", function(req, res){
    Spots.findById(req.params.id).populate("checkedIn").populate("comments").populate("uploads").exec(function(err, foundSpot){
        if (err){
            console.log(err);
        } else {
            res.render("spots/show", {singleSpot:foundSpot});
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
    });
  });
//================================================================

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

//===================
// RATING SPOT
//===================
router.post("/:id/rate", middleware.isLoggedIn, function(req, res){
    Users.findById(req.user._id, function(err, user){
        if(err){
            console.log("Rate error" + err);
        } else {
            //updating user model with Rated Spot's ID
            user.rated.push(req.params.id);
            user.save();
            Spots.findById(req.params.id, function(err, spot){
                if (err){
                    console.log(err);
                } else {

                    //OVERALL rating Block
                    var overallTotal = parseInt(spot.ratings.overall.total) + parseInt(req.body.overallRating);
                    var overallVotes = parseInt(spot.ratings.overall.votes) + 1 ;
                    var overallAvg = overallTotal / overallVotes;
                    
                    var newOverall = {
                        total: overallTotal,
                        votes: overallVotes,
                        avg: overallAvg.toFixed(1),
                    };
                    
                    var privacyTotal = parseInt(spot.ratings.privacy.total) + parseInt(req.body.privacyRating);
                    var privacyVotes = parseInt(spot.ratings.privacy.votes) + 1 ;
                    var privacyAvg = privacyTotal / privacyVotes;
                    
                    var newPrivacy = {
                        total: privacyTotal,
                        votes: privacyVotes,
                        avg: privacyAvg.toFixed(1),
                    };                    
                   
                    var diffTotal = parseInt(spot.ratings.difficulty.total) + parseInt(req.body.difficultyRating);
                    var diffVotes = parseInt(spot.ratings.difficulty.votes) + 1 ;
                    var diffAvg = diffTotal / diffVotes;
                    
                    var newDiff = {
                        total: diffTotal,
                        votes: diffVotes,
                        avg: diffAvg.toFixed(1),
                    };

                    var newRating = {
                        ratings:{
                            overall: newOverall,
                            difficulty: newDiff,
                            privacy: newPrivacy 
                        }
                    };
//============================================================================

                    //Updating Spot model with 
                    Spots.findByIdAndUpdate(spot, newRating, function(err, updatedRating){
                        if(err){
                            console.log("Slipped on the update." + err);
                        } else {
                            console.log(spot.ratings.avg + "stars");
                            spot.save();
                            res.redirect("back");
                        }
                    });

                }
            });
        }
    });
});

//=================================
//
//      Check In
//=================================
router.post("/:id/checkin", middleware.isLoggedIn, function(req, res){
    Spots.findById(req.params.id, function(err, spot){
        if (err){
            console.log(err);
        } else {
            //adding USER to SPOT
            console.log(req.user.username);
            spot.checkedIn.push(req.user._id);
            spot.save();
            Users.findById(req.user._id, function(err, user){
                if (err){
                    console.log(err);
                } else {
                    // adding SPOT to USER
                    user.checkedIn.push(req.params.id);
                    user.save();
                    
                }
            });

        }
        res.redirect("back");
    });
});


router.put("/:id/uncheckin", middleware.isLoggedIn, function(req, res){
    Users.findById(req.user._id, function(err, user){
        if (err){
            console.log(err);
        } else {
            user.checkedIn.remove(req.params.id);
            user.save();
            Spots.findById(req.params.id, function(err, spot){
                spot.checkedIn.remove(req.user._id);
                spot.save();
            });
        res.redirect("back");
        }
    });
});

//===========================================
//
//
//      Comments
//
//============================================
router.post("/:id/comment/add", middleware.isLoggedIn, function(req, res){
    var newComment = new Comments({
        author:{ 
            id: req.user._id,
            username: req.user.username  
        },
        spot: req.params.id,
        content: req.body.comment
    });

    Comments.create(newComment, function(err,newComment){
        if(err){console.log(err);} else {        
        console.log("Comment was created.");
        }

    });

    Spots.findById(req.params.id, function(err, spot){
        if(err){console.log(err)}
        spot.comments.push(newComment._id);
        spot.save();
    });

    Users.findById(req.user._id, function(err, user){
        if(err){console.log(err);}
        user.comments.push(newComment._id);
        user.save();
    });
    res.redirect("back");
});


module.exports = router;