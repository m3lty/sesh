var mongoose = require("mongoose");
var SpotSchema = new mongoose.Schema({
    name:String,
    //What is this for?
    location:String,
    state:{
      type: String,
      default: "Pennsylvania"
    },
    // Soon to be depreciated?
    lat: String,
    lng: String,
    //===========
    img: String,
    address: {
      addr1: String,
      city: String,
      zip: String,
    },
    author: {
        id: {
          type: mongoose.Schema.Types.ObjectId,
        },
        username: String,
      },
},{usePushEach: true})

module.exports = mongoose.model("Spot", SpotSchema);