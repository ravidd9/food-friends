const rp = require('request-promise-any')
const axios = require('axios')

class SocketCom {
    constructor() {
        this.users = []
    }

    async getUsers() {
        let users = await axios.get('/users')
        this.users = users.data
    }

    async toggleIsActive (email, flag) {
        let user = this.findUserByEmail(email)
        user.isActive = flag

        await this.updateUser('isActive', user)
        await this.getUsers()
    }

    async updateUser (valueToUpdate, user) {
        await axios.put(`/user/${valueToUpdate}`, user)
    }

    saveIdToUser(id, email) {
        let user = this.findUserByEmail(email)
        if(user) {
            user.socketId = id

        }
    }

    findUserByEmail(email) {
        return this.users.find(u => u.email === email)
    }

    findUsersSocketId(email) {
        let user = this.findUserByEmail(email)
        console.log
        return user.socketId
    }

    async findConversationIdByEmails(authorEmail, recipientEmail){
        let conversations = await axios.get(`/conversations`)
        conversations = conversations.data
        let conversation = conversations.find(c => c.users.some(u => u === authorEmail) && c.users.some(u => u === recipientEmail))
        return conversation ? conversation._id : false
    }
}

module.exports = SocketCom