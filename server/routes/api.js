const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/User')
const Food = require('../models/Food')
// const foods = require('../data')
// const users = require('../data')



const getUsers = async () => User.find({})
const getFoods = async () => Food.find({})

router.get('/sanity', function (req, res) {
    res.send('OK!')
})

router.get('/users', async function (req, res) {
    let users = await getUsers()
    res.send(users)
})

router.post(`/user`, async function (req, res) {
    const newUser = new User(req.body)
    let save = newUser.save()
    save.then(function (user) {
        res.send(user)
    })
})

router.put(`/user/:key`, async function (req, res) {
    const user = req.body
    let key = req.params.key
    let id = user._id
    let value = user[key]


    let update = User.findByIdAndUpdate(id,{[key]: value}, {new : true})
    update.then(function(user){
        res.send(user)
    })
})

router.get('/foods', async function (req, res) {
    let foods = await getFoods()
    res.send(foods)
})

router.post(`/food`, async function (req, res) {
    const newFood = new Food(req.body)
    let save = newFood.save()
    save.then(function (food) {
        res.send(food)
    })
})



module.exports = router

const saveUser = function () {
    for (let user of users) {
        const newUser = new User(user)
        let save = newUser.save()
        save.then(console.log("saved"))
    }
}

const saveFood = function() {
    for(let food of foods) {
        const newFood = new Food(food)
        let save = newFood.save()
        save.then(console.log("saved"))
    }
}


// saveUser()
// saveFood()

