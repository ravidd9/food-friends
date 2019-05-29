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
        let user = this.users.find(u => u.firstName === firstName)
        user.socketId = id
    }
}

module.exports = SocketCom