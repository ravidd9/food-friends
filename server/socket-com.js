const rp = require('request-promise')

class SocketCom {
    constructor() {
        this.users = []
    }

    async getUsers() {
        let users = await rp.get('http://localhost:8000/users')
        this.users = JSON.parse(users)
    }

    saveIdToUser(id, firstName) {
        let user = this.findUserByName(firstName)
        user.socketId = id
    }

    findUserByName(firstName) {
        return this.users.find(u => u.firstName === firstName)
    }

    findUsersSocketId(firstName) {
        let user = this.findUserByName(firstName)
        return user.socketId
    }
}

module.exports = SocketCom