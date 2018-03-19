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
//ME NEXT
//=============================
middlewareObj.checkOwnership = function(req, res, next){
  console.log("Checking ownership");
  if(req.isAuthenticated()){
    console.log("Is authed");
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
    console.log("super non auth");
    res.redirect("/");
  }
}

// middlewareObj.checkConOwnership = function(req, res, next){
//   if (req.isAuthenticated()){
//     Conventions.findById(req.params.id, function(err, convention){
//       if(err){
//         res.redirect("back");
//       } else {
//             if (convention.author.id.equals(req.user._id)){
//               next();
//             } else {
//               res.redirect("back");
//             }
//       }
//     });

//   } else {
//     res.redirect("back");
//   }
// };

// middlewareObj.checkCosplayOwnership = function(req,res,next){
//   if(req.isAuthenticated()){
//     Cosplays.findById(req.params.id, function(err, cosplay){
//       if(err){
//         res.redirect("back");
//       } else {
//         if (cosplay.author.id.equals(req.user._id)){
//           next();
//         } else {
//           res.redirect("back");
//         }
//       }
//     });
//   }
// };
module.exports = middlewareObj;
