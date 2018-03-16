
module.exports = {
 upcomingSort: function (a, b){
    return new Date(a.date) - new Date(b.date);
},
  alphaSort: function(a, b){
    var nameA = a.name.toUpperCase();
    var nameB = b.name.toUpperCase();
    if (nameA < nameB){
      return -1;
    }
    if (nameA > nameB){
      return 1;
    }

    return 0;
  },
  // popularSort: function(a, b){
  //   var aLikes = a.likedBy.length;
  //   console.log(aLikes);
  //   var bLikes = b.likedBy.length;
  //
  //   if (aLikes < bLikes){
  //     return a;
  //   }
  //   if (bLikes < alikes){
  //     return b;
  //   }
  // },
};
function toggleBoard(){
   var board = document.getElementById("secondaryInfo");
   var info = document.getElementById("mainInfo");
   var list = document.getElementsByClassName("list-group-item");
   board.classList.toggle("hiddenElement");
   info.classList.toggle("hiddenElement");
   list.classList.toggle("active");
};
function dropDownPopulate(cons){
  var select = document.getElementById("consworn");
  cons.forEach(function(cons){
    var cons= cons[i], el= document.createElement("option");
    el.textcontent = cons.name;
    el.value = cons;
    select.appendchild(el);
 });
};
function toggleSignIn(){
  var flip = document.getElementsByClassName("landingSignUp");
  flip[0].classList.toggle("d-none");
  flip[1].classList.toggle("d-none");
};
function countLikes(obj){
  var likes = 0;
  for (var i = 0; i < obj.length; i++) {
    likes++;
  }
  return likes;
};
