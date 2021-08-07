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
    affiliationDate: Date,
    occupation: String,
    birthdate: Date,
    deleted: Boolean,
    astronomicalPoints: Number,
    neasDiscovered: [String],
    necsDiscovered: [String]
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