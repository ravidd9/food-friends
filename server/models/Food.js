const mongoose = require('mongoose')
const Schema = mongoose.Schema

const foodSchema = new Schema({
    name: String,
    pic: String
})

const Food = mongoose.model('Food', foodSchema, "Foods")

module.exports = Food