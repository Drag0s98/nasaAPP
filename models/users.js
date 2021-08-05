const mongoose = require("mongoose")

let userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    nickname: String,
    affiliatedNumber:{
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