var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var UserSchema = new mongoose.Schema({

  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "Cannot be blank"],
    index: true

  },
  usernameId: String,   //Do I use this?
  email: String,
  usertype: {type: Number, default: 0}, //Mod Rights
  created: {type: Date, default:Date.now},
  bio: String,
  password: String,
  avatar: {
    type:String,
    default:"/img/placeholder-avatar.png"
  },
  rated:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Spots"
    },
  ],
  checkedIn: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Spots"
  }],

  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }]


},{usePushEach:true});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);