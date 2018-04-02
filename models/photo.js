const mongoose = require("mongoose");

let PhotoSchema = new mongoose.Schema({
    img: String,

    spot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Spots"
    },

    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users"
        },
        username: String,
    },
}, {usePushEach: true});

module.exports = mongoose.model("Photo", PhotoSchema);