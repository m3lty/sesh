var mongoose = require("mongoose");
var SpotSchema = new mongoose.Schema({
    name:String,
    location:String,
    state:String,
});

module.exports = mongoose.model("Spot", SpotSchema);