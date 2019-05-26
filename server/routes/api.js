const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Client = require('../models/Client')

const getClients = async () => Client.find({})

router.get('/sanity', function (req, res) {
    res.send('OK!')
})

router.get('/clients', async function (req, res) {
    let clients = await getClients()
    res.send(clients)
})

router.put('/client/:id', async function (req, res) {
    
})

router.post('/client', function (req, res) {
    const reqClient = req.body

    const newClient = new Client({
        name: reqClient.name,
        email: reqClient.email,
        firstContact: reqClient.firstContact,
        emailType: reqClient.emailType,
        sold: reqClient.sold,
        owner: reqClient.owner,
        country: reqClient.country

    })

    let save = newClient.save()
    save.then(function (client) {
        res.send('Client has been saved')
    })
})

module.exports = router