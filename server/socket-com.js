const rp = require('request-promise')

class SocketCom {
    constructor() {
        this.users = []
    }

    async getUsers() {
        let users = await rp.get('http://localhost:8000/users')
        this.users = JSON.parse(users)
    }

    async toggleIsActive (email, flag) {
        let user = this.findUserByEmail(email)
        user.isActive = flag

        await this.updateUser('makeActive', user)
        await this.getUsers()
    }

    async updateUser (valueToUpdate, user) {
        await rp.put(`http://localhost:8000/user/${valueToUpdate}`, user)
    }

    async saveIdToUser(id, email) {
        let user = this.findUserByEmail(email)
        user.socketId = id

        await this.updateUser('socketId', user)
        await this.getUsers()
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