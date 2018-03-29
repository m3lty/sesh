var mongoose = require("mongoose");
var CommentSchema = new mongoose.Schema({
    author:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
    },

    spot:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Spot"
    },
    posted:{
        type: Date,
        default: Date.now,
    }

}, {usePushEach:true});

module.exports = mongoose.model("Comment", CommentSchema);