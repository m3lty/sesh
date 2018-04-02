const mongoose = require("mongoose");

let PhotoSchema = new mongoose.Schema({
    img: String,

    spot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Spots"
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
}, {usePushEach: true});

module.exports = mongoose.model("Photo", PhotoSchema);