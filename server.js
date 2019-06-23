const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const api = require('./server/routes/api')
const mongoose = require('mongoose')
const socket = require('socket.io');
const SocketCom = require('./server/socket-com')
const CronJob = require('cron').CronJob
const axios = require('axios')



mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/FoodFriends", {
    useNewUrlParser: true
})



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(express.static(path.join(__dirname, 'server/socket-com')))

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    next()
})
app.use('/', api)


const socketCom = new SocketCom()

const port = 8000
let server = app.listen(process.env.PORT || port, function () {
    console.log(`Server running on ${port}`)
    // socketCom.getUsers()
})


io = socket(server)

io.on('connection', (socket) => {

    socket.emit('GET_USERNAME')

    socket.on('SAVE_ID', async function (data) {
        // socketCom.getUsers()
        // console.log(socket.id + "" + data.currentUser)
        socketCom.saveIdToUser(socket.id, data.currentUser)
        // console.log(socketCom.users)
    })


    socket.on('MATCH', async function (data) {
        console.log("matched user: " + data.matchedUser)
        let userSocketId = await socketCom.findUsersSocketId(data.matchedUser)
        console.log("socked id: " + userSocketId)
        let matchEmail = data.currentUser
        socket.broadcast.to(userSocketId).emit('RECEIVE_MATCH', matchEmail)
        // io.emit('RECEIVE_MATCH', data)
    })

    socket.on('SEND_MESSAGE', async function (data) {
        console.log(data)
        let author = await socketCom.findUserByEmail(data.author)
        let conversationId = await socketCom.findConversationIdByEmails(data.author, data.recipient)
        let conversation = {}
        let conversations = await axios.get(`http://localhost:8000/conversations`)
        conversations = conversations.data
        conversation = conversations.find(c => c._id === conversationId)

        conversation.messages.push({
            author: author.firstName,
            text: data.message,
            time: new Date()
        })

        
        
        conversation = await axios.put(`http://localhost:8000/conversations/update`, conversation)

        console.log(data.recipient)
        let userSocketId = await socketCom.findUsersSocketId(data.recipient)

        // console.log(userSocketId)
        if (userSocketId) {
            console.log("imhere")
            console.log(userSocketId)
            socket.broadcast.to(userSocketId).emit('RECEIVE_MESSAGE', "string");
        } else {
            //push notification
        }
    })

})

io.on('disconnect', () => {
    socketCom.saveIdToUser("", data.currentUser)
})

const job = new CronJob('0 */10 * * * *', async function () {
    let users = await axios.get('http://localhost:8000/users')

    let activeUsers = users.data.filter(u => u.isActive)
    activeUsers.forEach(u =>
        parseInt(((new Date() - new Date(u.lastSeen)) / 1000) / 60) > 60 ? u.isActive = false : null)

    let nonActiveUsers = activeUsers.filter(u => !u.isActive)
    nonActiveUsers.forEach(u => socketCom.updateUser('isActive', u))

    await socketCom.getUsers()
})

job.start()