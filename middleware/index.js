var middlewareObj = {};



middlewareObj.isLoggedIn = function(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
};

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
