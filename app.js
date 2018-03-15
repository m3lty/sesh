const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const localStrategy = require("passport-local");
const indexRoute = require("./routes/index");
const spotRoute = require("./routes/spots");
const angular = require("angular");
var Spots = require("./models/spot");

app.use(express.static(path.join(__dirname,'public')));
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost/sesh");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//PASSPORT SET UP==============================
// app.set('views', path.join(__dirname, 'views'));
// app.use(require("express-session")({
//   secret:"Oppai Oppai Oppai",
//   resave: false,
//   saveUninitialized: false
// }));
// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(new localStrategy(User.authenticate()));

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// app.use(function(req, res, next){
//   res.locals.currentUser = req.user;
//   next();
// });
//===========================================


//Connecting route folders
app.use("/", indexRoute);
app.use("/spots", spotRoute);
//SHOWS SPOTS BY STATE


app.listen(3000, function(){
    console.log("Sesh is listening on port 300");
});

function stateMatch(spot) {
    if(spot.state == req.params.id){
        return true;
    }
}