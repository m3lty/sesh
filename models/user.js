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
  usernameId: String,
  email: String,
  birthday: Date,
  usertype: {type: Number, default: 0}, //Mod Rights
  created: {type: Date, default:Date.now},

  password: String,
  avatar: {
    type:String,
    default:"/img/placeholder-avatar.png"
  },

},{usePushEach:true});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);