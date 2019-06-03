const mongoose = require('mongoose')
const Schema = mongoose.Schema

const conversationSchema = new Schema({
    messages: [
        {author: String,
        text: String,
        time: Date}
    ]
})

const Conversation = mongoose.model('Conversation', conversationSchema)

module.exports = {Conversation, conversationSchema}