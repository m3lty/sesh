const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var Spots = require("./models/spot");

app.use(express.static(path.join(__dirname,'public')));
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost/sesh");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var states = fs.readFileSync("states.txt").toString();
var stateList = states.split("\r\n");

// renders home page
app.get("/", function(req, res){
    res.render("home", {stateList:stateList});

});
//SHOWS SPOTS BY STATE
app.get("/state/:id", function(req, res){
    Spots.find({'state':req.params.id}, function(err,localSpot){
        if(err){
            console.log(err);
        }else {
            console.log(localSpot);
            res.render("bystate", {state:req.params.id, localSpot:localSpot});
        }
    });
    
    
    


});
//ADD SPOT ROUTE
app.get("/newspot", function(req, res){
    res.render("newspot", {stateList:stateList});
});

app.post("/newspot", function(req, res){
    var newSpot = new Spots({
        name: req.body.spotName,
        location: req.body.location,
        state: req.body.state
    });

    Spots.create(newSpot, function(err, newSpot){
        if (err){
            console.log(err);
        } else {
            res.redirect("/");
        }
    })
});

app.listen(3000, function(){
    console.log("Sesh is listening on port 300");
});

function stateMatch(spot) {
    if(spot.state == req.params.id){
        return true;
    }
}