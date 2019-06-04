const rp = require('request-promise-any')
const axios = require('axios')

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

        await this.updateUser('isActive', user)
        await this.getUsers()
    }

    async updateUser (valueToUpdate, user) {
        await axios.put(`http://localhost:8000/user/${valueToUpdate}`, user)
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
        return user.socketId
    }

    async findConversationIdByEmails(authorEmail, recipientEmail){
        let conversations = await axios.get(`http://localhost:8000/conversations`)
        let conversation = conversations.length ? conversations.find(c => c.users.some(u => u === authorEmail) && c.users.some(u => recipientEmail)) : false
        console.log(conversation)
        return conversation ? conversation._id : false
    }
}

module.exports = SocketCom