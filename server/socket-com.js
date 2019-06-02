const rp = require('request-promise')

class SocketCom {
    constructor() {
        this.users = []
    }

    async getUsers() {
        let users = await rp.get('http://localhost:8000/users')
        this.users = JSON.parse(users)
    }

    saveIdToUser(id, email) {
        let user = this.findUserByEmail(email)
        console.log(email)
        user.socketId = id
    }

    findUserByEmail(email) {
        return this.users.find(u => u.email === email)
    }

    findUsersSocketId(email) {
        let user = this.findUserByEmail(email)
        return user.socketId
    }
}

module.exports = SocketCom