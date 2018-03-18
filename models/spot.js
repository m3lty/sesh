var mongoose = require("mongoose");
var SpotSchema = new mongoose.Schema({
    name:String,
    location:String,
    state:String,
    lat: String,
    lng: String,
    img: String,
    author: {
        id: {
          type: mongoose.Schema.Types.ObjectId,
        },
        username: String,
      },
},{usePushEach: true})

module.exports = mongoose.model("Spot", SpotSchema);