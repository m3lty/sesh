var mongoose = require("mongoose");
var CommentSchema = new mongoose.Schema({
    content: String,
    author:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users"
        },  
    },
    spot:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Spots"
        },
    }
});

module.exports = mongoose.model("Comment", CommentSchema);