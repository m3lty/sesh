var mongoose = require("mongoose");
var SpotSchema = new mongoose.Schema({
    name:String,
    //What is this for?

    // Soon to be depreciated?
    // lat: String,
    // lng: String,
    //===========
    //The initial uploaded Image - not tied directly to a user
    mainImg: String,
    //The Human Readable address initially entered by user
    address: {
      addr1: String,
      city: String,
      zip: String,
      state:{
        type: String,
        default: "Pennsylvania"
      },
      //Concat'd user input for use with Geocoding
      geo: String,
    },
    author: {
        id: {
          type: mongoose.Schema.Types.ObjectId,
        },
        username: String,
      },
    rating: Number,
    desc: String,
    

},{usePushEach: true})

module.exports = mongoose.model("Spot", SpotSchema);