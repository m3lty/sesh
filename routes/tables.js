var express = require("express");
var router = express.Router();
var middleware = require("../middleware");
var mongoose = require("mongoose");
var multer = require("multer");
var path = require("path");
var fs = require("fs");
var Users = require("../models/user");
var Tables = require("../models/table");
// var Comments = require("../models/comment");
// var Photos = require("../models/photo");

//==== New Table Form

router.get("/newtable", middleware.isLoggedIn, function(req, res){
    res.render("tables/newtable")
});

//==New Table POSTs
router.post("/", middleware.isLoggedIn, function(req, res){
    var newTable = new Tables({
       groupName: req.body.tableName,
       system: req.body.systemName,
       location: req.body.locationTable,
       hasGm: req.body.needGm,

       owner: req.user._id,
       members: req.user._id,

       desc: req.body.descTable,
       
    });

    Tables.create(newTable, function(err, newTable){
        if (err){
            console.log("Posting new Table ERR");
            console.log(err);
        } else {
            console.log(newTable.groupName + " was added at " + Date.now());
            res.redirect("/");
        }
    })
});
// == Show's list of Tables
router.get("/show", function(req, res){
    Tables.find({}).populate("members").exec(function(err, tables){
        if(err){
            console.log(err);
        } else {
            res.render("tables/tablelist", {tables:tables});
        }
         

    });
});
// = Show Single Table page
router.get("/:id", function(req,res){
    Tables.findById(req.params.id).populate("members").exec(function(err, foundTable){
        if(err){
            console.log(err);
            res.redirect("/");
        } else {
            res.render("tables/show", {singleTable:foundTable});
        }
    });

});

router.put("/:id", function(req,res){
    Tables.findById(req.params.id).populate("members").exec(function(err, foundTable){
        if (err){
            console.log(err)
        } else {
            foundTable.members.push(req.user._id);
            foundTable.save()
        }
        
        res.redirect("back")
    })
})









module.exports = router;