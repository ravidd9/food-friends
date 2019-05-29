const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({

    firstName : String,
    lastName : String,
    birthDay: Date,
    email : String,
    password : String, 
    interests : [String], 
    profilePic : String,
    interestedFood: [String]
})

const User = mongoose.model('User', userSchema, "Users")


module.exports = User