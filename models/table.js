const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const TableSchema = new mongoose.Schema({

    groupName: String,
    desc: String,
    system: String,
    location: String,
    hasGm: Boolean,
    created: {type:Date, default:Date.now},
    gameMaster: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    
    owner: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "User",
   },

    members: [
       {
           type: mongoose.Schema.Types.ObjectId,
           ref: "User",
       },
   ],
},{usePushEach: true});

module.exports = mongoose.model("Table", TableSchema);
