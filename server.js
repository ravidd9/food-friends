const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const api = require('./server/routes/api')
const mongoose = require('mongoose')
const socket = require('socket.io');
const rp = require('request-promise')
const SocketCom = require('./server/socket-com')


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/FoodFriends", { useNewUrlParser: true })



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
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
    socketCom.getUsers()
})


io = socket(server)

io.on('connection', (socket) => {

    socket.on('USER_IN', function(data) {
        socketCom.saveIdToUser(socket.id, data.currentUser)
    })
    
    
    socket.on('MATCH', function(data){
        let userSocketId = socketCom.findUsersSocketId(data.matchedUser)
        // console.log(userSocketId)
        let matchEmail = data.currentUser 
        socket.broadcast.to(userSocketId).emit('RECEIVE_MATCH', matchEmail)
        // io.emit('RECEIVE_MATCH', data)
    })

})