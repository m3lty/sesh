const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const localStrategy = require("passport-local");

const indexRoute = require("./routes/index");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const tableRoute = require("./routes/tables");
const methodOverride = require("method-override");

var User = require("./models/user");

app.use(express.static(path.join(__dirname,'public')));
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost/sesh");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//PASSPORT SET UP==============================
app.set('views', path.join(__dirname, 'views'));
app.use(require("express-session")({
  secret:"Oppai Oppai Oppai",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
});
//===========================================
app.use(methodOverride("_method"));

//Connecting route folders
app.use("/", indexRoute, authRoute);


app.use("/users", userRoute);

app.use("/tables", tableRoute);



app.listen(8080, function(){
    console.log("Sesh is listening on port 8080");
});
