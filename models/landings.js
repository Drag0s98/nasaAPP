const mongoose = require('mongoose')

let landingsSchema = new mongoose.Schema({

    name:String,
    id:String,
    nametype:String,
    recclass:String,
    mass:String,
    fall:String,
    year:String,
    reclat:String,
    reclong:String,
    geolocation:Object
    
})


module.exports = mongoose.model('Landings', landingsSchema)
