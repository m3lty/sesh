var mongoose = require("mongoose");
var SpotSchema = new mongoose.Schema({
    name:String,
    location:String,
    state:String,
    lat: String,
    lng: String,
},{usePushEach: true})

module.exports = mongoose.model("Spot", SpotSchema);