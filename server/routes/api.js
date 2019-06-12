const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/User')
const Food = require('../models/Food')
const Conversation = require("../models/Conversation").Conversation
const path = require("path");

const foods = require('../data')
const users = require('../data')

const multer = require("multer");


const storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: function (req, file, cb) {
        cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
}).single("myImage");

const getUsersFromDB = async () => User.find({}) //should only query anyone who isActive
const getFoodsFromDB = async () => Food.find({})
const getConversationsFromDB = async () => Conversation.find({})





router.get('/sanity', function (req, res) {
    res.send('OK!')
})

router.get('/users', async function (req, res) {
    let users = await getUsersFromDB()
    res.send(users)
})

router.post(`/user`, async function (req, res) {
    const newUser = new User(req.body)
    let save = newUser.save()
    save.then(function (user) {
        res.send(user)
    })
})

router.post(`/conversation`, async function (req, res) {
    console.log(req.body)
    const newConversation = new Conversation(req.body)
    let save = newConversation.save()
    save.then(function (conversation) {
        res.send(conversation)
    })
})

// const isEmpty = function (obj) {
//     for(var key in obj) {
//         if(obj.hasOwnProperty(key))
//             return false;
//     }
//     return true;
// }

router.put(`/user/:key`, async function (req, res) {
    let user = req.body
    let key = req.params.key
    let id = user._id
    let value = user[key]
    let update = User.findByIdAndUpdate(id, { [key]: value }, { new: true })
    update.then(function (user) {
        res.send(user)
    })
})

router.get('/foods', async function (req, res) {
    let foods = await getFoodsFromDB()
    res.send(foods)
})

router.get('/conversations', async function (req, res) {
    let conversations = await getConversationsFromDB()
    res.send(conversations)
})

router.get('/conversation/:id', async function(req, res) {
    let conversation = await Conversation.find({_id: req.params.id})
    res.send(conversation)
})

router.put('/conversations/update', async function (req, res) {
    let body = req.body
    let update = Conversation.findByIdAndUpdate(body._id, { messages: req.body.messages }, {new:true})
    update.then(function (conversation) {
        res.send(conversation)
    })
})

router.post(`/food`, async function (req, res) {
    const newFood = new Food(req.body)
    let save = newFood.save()
    save.then(function (food) {
        res.send(food)
    })
})


router.post('/upload', function (req, res) {
    upload(req, res, function (err) {
        console.log("Request ---", req.body);
        console.log("Request file ---", req.file);//Here you get file.
        /*Now do where ever you want to do*/
        if (!err) {
            return res.send(200).end();
        }
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

const saveFood = function () {
    for (let food of foods) {
        const newFood = new Food(food)
        let save = newFood.save()
        save.then(console.log("saved"))
    }
}






// saveUser()
// saveFood()

