const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: String,
    birthDay: Date,
    email : String,
    password : String, 
    interestes : [String], 
    profilePic : String
})

const User = mongoose.model('User', userSchema, "Users")


module.exports = User