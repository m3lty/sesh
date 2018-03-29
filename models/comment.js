var mongoose = require("mongoose");
var CommentSchema = new mongoose.Schema({
    author:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
    },

    spot:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Spot"
    },
    posted:{
        type: Date,
        default: Date.now,
    },
    content: String,

}, {usePushEach:true});

module.exports = mongoose.model("Comment", CommentSchema);
//added a comment