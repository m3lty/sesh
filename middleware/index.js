var middlewareObj = {};
var Spots = require("../models/spot")

middlewareObj.isLoggedIn = function(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else{
  console.log("Unregistered user attempted to do something.");
    res.redirect("/");
  
  }
};
//Checking Ownership of SPOT
//=============================
middlewareObj.checkOwnership = function(req, res, next){
  if(req.isAuthenticated()){
    Spots.findById(req.params.id, function(err, spot){
      if(err){
        console.log(err);
        res.redirect("back");
      } else {
        if (spot.author.id.equals(req.user._id)){
          next();
        } else {
          res.redirect("/");
        }

      }
    });
  } else {
    res.redirect("/");
  }
}
module.exports = middlewareObj;
