const rp = require('request-promise-any')
const axios = require('axios')

class SocketCom {
    constructor() {
        this.users = []
    }

    async getUsers() {
        let users = await axios.get('http://localhost:8000/users')
        this.users = users.data
    }

    async toggleIsActive (email, flag) {
        let user = this.findUserByEmail(email)
        user.isActive = flag

        await this.updateUser('isActive', user)
        // await this.getUsers()
    }

    async updateUser (valueToUpdate, user) {
        await axios.put(`http://localhost:8000/user/${valueToUpdate}`, user)
    }

    async saveIdToUser(id, email) {
        let user = await axios.get(`http://localhost:8000/user/${email}`)
        
        user = user.data
        user.socketId = id
        
        if(user) {
            await this.updateUser("socketId", user)
        }
    }

    async findUserByEmail(email) {
        let user = await axios.get(`http://localhost:8000/user/${email}`)
        return user.data
    }

    async findUsersSocketId(email) {
        let user = await axios.get(`http://localhost:8000/user/${email}`)
        // console.log("found user socked id: " + user.data.socketId)
        return user.data.socketId
    }

    async findConversationIdByEmails(authorEmail, recipientEmail){
        let conversations = await axios.get(`http://localhost:8000/conversations`)
        conversations = conversations.data
        let conversation = conversations.find(c => c.users.some(u => u === authorEmail) && c.users.some(u => u === recipientEmail))
        return conversation ? conversation._id : false
    }
}

module.exports = SocketCom