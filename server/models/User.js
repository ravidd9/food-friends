const mongoose = require('mongoose')
const Schema = mongoose.Schema
const conversation = require("../models/Conversation")
const conversationSchema = conversation.conversationSchema

const userSchema = new Schema({

    firstName : String,
    lastName : String,
    birthDay: Date,
    email : String,
    password : String, 
    interests : [String], 
    profilePic : String,
    interestedFood: [String],
    matchedWith: [String],
    socketId: String,
    isActive: Boolean,
    kosher: Boolean,
    vegan: Boolean,
    vegetarian: Boolean,
    lastSeen: Date,
    conversations : [conversationSchema],
    location: {
        name: String,
        latitude: Number,
        longitude: Number
    }

})

const User = mongoose.model('User', userSchema, "Users")


module.exports = User