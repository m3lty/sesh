var mongoose = require("mongoose");
var SpotSchema = new mongoose.Schema({
    name:String,
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
      newgeo: {}
    },

    //Defines Author of Spot
    author: {
        id: {
          type: mongoose.Schema.Types.ObjectId,
        },
        username: String,
      },

    desc: String,

  
    ratings:{
      overall:{

        total:{
          type: Number,
          default: 0
        },
        votes:{
          type:Number,
          default:1
        },
        avg:{
          type: Number,
          default: 0
        }
      },
      difficulty:{
        total:{
          type: Number,
          default: 0
        },
        votes:{
          type:Number,
          default:1
        },
        avg:{
          type: Number,
          default: 0
        }
      },
      privacy:{
        total:{
          type: Number,
          default: 0
        },
        votes:{
          type:Number,
          default:1
        },
        avg:{
          type: Number,
          default: 0
        }
      }

    },

    checkedIn: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }],
    comments: [{
      type:mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }],
    uploads:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Photo"
    }],
    

},{usePushEach: true})

module.exports = mongoose.model("Spot", SpotSchema);