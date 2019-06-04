const mongoose = require('mongoose')
const Schema = mongoose.Schema

const conversationSchema = new Schema({
    users : [String],
    messages: [
        {author: String,
        text: String,
        time: Date}
    ]
})

const Conversation = mongoose.model('Conversation', conversationSchema, "Conversations")

module.exports = {Conversation, conversationSchema}