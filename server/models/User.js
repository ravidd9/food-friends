const mongoose = require('mongoose')
const Schema = mongoose.Schema
const conversation = require("../models/Conversation")
const conversationSchema = conversation.conversationSchema

const userSchema = new Schema({

    firstName : String,
    lastName : String,
    email : String,
    password : String, 
    interests : [String], 
    profilePic : String,
    interestedFood: [String],
    matchedWith: [String],
    isActive: Boolean,
    kosher: Boolean,
    vegan: Boolean,
    vegetarian: Boolean,
    lastSeen: Date,
    conversations : [{type: Schema.Types.ObjectId, ref: 'Conversation'}],
    location: {
        name: String,
        latitude: Number,
        longitude: Number
    },
    socketId: String

})

const User = mongoose.model('User', userSchema, "Users")


module.exports = User