const mongoose = require("mongoose")

let userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    nickname: String,
    affiliatedNumber: {
        type: Number,
        required: true,
        unique: true
    },
    affiliationDate: {
        type: Date,
        default: Date.now()
    },
    occupation: String,
    birthdate: Date,
    deleted: {
        type: Boolean,
        default: false
    },
    astronomicalPoints: {
        type: Number,
        default: 0
    },
    neasDiscovered: {
        type: [String],
        default: ['0']
    },
    necsDiscovered:{
        type: [String],
        default: ['0']
    }
})

module.exports = mongoose.model('Users', userSchema)



/*
{
  "name":"Dragos",
  "nickname": "xJaki91x",
  "affiliatedNumber": 12345,
  "affiliationDate": "2021-08-07",
  "occupation": "nini",
  "birthdate": "1998-11-16",
  "deleted": false,
  "astronomicalPoints": 50,
  "neasDiscovered": ["lorem"],
  "necsDiscovered": ["ipsun"]
}
*/