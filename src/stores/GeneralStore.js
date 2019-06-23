import {
    observable,
    action,
    computed
} from 'mobx'
import axios from '../../node_modules/axios/dist/axios'
import io from 'socket.io-client'
const CronJob = require('cron').CronJob

const API_URL = 'http://localhost:8000'

export class GeneralStore {
    @observable users = []
    @observable foods = []
    @observable filteredFood = []
    // @observable budget = 150
    @observable foodSearch = ""

    @observable socket = io('http://localhost:8000');
    @observable matchNotification = {
        open: false,
        name: ""
    }
    @observable currentUser = JSON.parse(sessionStorage.getItem('login')) || {}
    @observable conversations = []
    @observable facebookDetails = []
    @observable dummy = 0
    @observable socket = io('http://localhost:8000');

    @action changeDummy = () => {
        let newDummy = this.dummy + 1
        this.dummy = newDummy
        // this.dummy.replace(newDummy)
    }
    getUserFromConvs = () => {
        let emails = []
        this.conversations.forEach(c => {
            if (c.users) {
                c.users.forEach(u => {
                    if (u !== this.currentUser.email) {
                        emails.push(u)
                    }
                })
            }
        })
        let users = emails.map(e => this.getUserByEmail(e))
        return users
    }

    getUserByEmail = email => this.users.find(u => u.email === email)

    getEmailsByUsers = users => users.map(u => u.email)

    @computed get searchFoodArray() {
        return this.foods.filter(f => f.name.includes(this.foodSearch))
    }

    getFoodByName = name => this.foods.find(f => f.name === name)

    @action getUsersConversationsFromDB = async () => {
        // console.log(this.currentUser.conversations)
        let tempArr = []
        for (let c of this.currentUser.conversations) {
            let conversation = await axios.get(`${API_URL}/conversation/${c}`)
            console.log(conversation.data[0])
            tempArr.push(conversation.data[0])
            // console.log(this.conversations)
        }
        this.conversations.replace(tempArr)
        // console.log(this.conversations[0])
    }

    @action saveUser = async (user) => {
        let randomNum = Math.floor(Math.random() * 1000) + 1;
        user.profilePic = `https://api.adorable.io/avatars/${randomNum}.jpg`
        let newUser = await axios.post(`${API_URL}/user`, user)

        console.log(newUser)
        await this.getUsersFromDB()
        return newUser.data
    }

    @action makeActive = async () => {
        this.currentUser.isActive = true
        this.currentUser.lastSeen = new Date()

        await this.updateUserInDB(this.currentUser, 'isActive')
        await this.updateUser('lastSeen', this.currentUser)
    }

    @action saveFood = async food => {
        let doesExist = this.foods.some(u => u.name == food)

        if (doesExist) {
            alert("Food already exists, please select it from bubbles.")
        } else {
            let foodToAdd = await axios.get(`http://www.recipepuppy.com/api/?q=${food}`)
            console.log(foodToAdd)

        }
    }
    @action getUsersFromDB = async () => {
        let users = await axios.get(`${API_URL}/users`)
        this.users = users.data
    }
    @action getFoodsFromDB = async () => {
        let foods = await axios.get(`${API_URL}/foods`)
        this.foods = foods.data
    }

    getConversationsFromDB = async () => {
        let conversationsFromDB = await axios.get(`${API_URL}/conversations`)
        await this.conversations.push(conversationsFromDB)
        return conversationsFromDB.data
    }

    @action filterFoodByName = async (selectedFood) => {
        if (this.doesExistInFilteredFood(selectedFood)) {
            let indexOfSelected = this.filteredFood.findIndex(f => f === selectedFood)
            this.filteredFood.splice(indexOfSelected, 1)
        } else {
            this.filteredFood.push(selectedFood)
        }
    }


    doesExistInFilteredFood = selectedFood => this.filteredFood.some(f => f === selectedFood)

    updateSessionStorage = user => sessionStorage.setItem('login', JSON.stringify(user))

    updateUserInDB = async (user, value) => await axios.put(`${API_URL}/user/${value}`, user)

    @action addInterestedFood = async () => {
        this.currentUser.interestedFood = this.filteredFood
        await this.updateUser('interestedFood')
    }

    @action addMessage = async data => {

        console.log(data)

        let currentUser = this.currentUser
        let matchedUser = this.users.find(u => u.email == data.recipient)
        console.log(currentUser)
        console.log(matchedUser)

        let message = {
            author: data.author,
            message: data.message
        }

        let conversationsFromDB = await this.getConversationsFromDB()
        console.log(conversationsFromDB)
        let conversationToUpdate = conversationsFromDB.find(c =>
            c.users[0] == matchedUser.email && c.users[1] == currentUser.email ||
            c.users[0] == currentUser.email && c.users[1] == matchedUser.email)

        console.log(conversationToUpdate)
        // conversationToUpdate.messages.push(message)
        // this.updateConversationInDB(conversationToUpdate)

    };

    @action updateUser = async valueToUpdate => {
        await this.updateUserInDB(this.currentUser, valueToUpdate)
        this.updateSessionStorage(this.currentUser)

        await this.getUsersFromDB()
    }

    @action updateOtherUser = async (otherUser, valueToUpdate) => {
        await this.updateUserInDB(otherUser, valueToUpdate)

        await this.getUsersFromDB()
    }

    getInterestedUsers = foodName => {
        let interestedUsers = this.removeCurrentUser()
        interestedUsers = this.findUsersByFoodName(interestedUsers, foodName)
        interestedUsers = this.sortUsersByInterests(interestedUsers)
        return interestedUsers
    }

    removeCurrentUser = () => {
        let usersWithoutCurrent = [...this.users]
        let currentUserIndex = usersWithoutCurrent.findIndex(u => u.email == this.currentUser.email)
        usersWithoutCurrent.splice(currentUserIndex, 1)
        return usersWithoutCurrent
    }

    updateConversationInDB = async (conversationToUpdate) => {
        await axios.put(`${API_URL}/conversations/update`, conversationToUpdate);
        await this.getConversationsFromDB()
    }


    @action addConversation = async (newConversation, matchedUserEmail) => {
        let conversation = await axios.post(`${API_URL}/conversation`, newConversation)

        conversation = conversation.data
        console.log(conversation._id)
        this.currentUser.conversations.push(conversation._id)
        this.updateUser('conversations')

        let matchedUser = this.users.find(u => u.email === matchedUserEmail)
        matchedUser.conversations.push(conversation._id)
        await this.updateUserInDB(matchedUser, 'conversations')
        await this.getUsersFromDB()
    }

    @action findUsersByFoodName = (interestedUsers, foodName) =>
        interestedUsers.filter(u => u.interestedFood.some(f => f === foodName))

    @action sortUsersByInterests = users => {
        let rating = {}
        users.forEach(u => rating[u.email] = 0)
        for (let user of users) {
            for (let inter of user.interests) {
                for (let inter2 of this.currentUser.interests) {
                    if (inter2 === inter) {
                        rating[user.email]++
                    }
                }
            }
        }

        let emails = Object.keys(rating)
        let sortedEmails = []
        let maxInterests = -1
        let maxEmail = ""
        while (emails.length) {
            for (let email of emails) {
                if (rating[email] > maxInterests) {
                    maxInterests = rating[email]
                    maxEmail = email
                }
            }
            sortedEmails.push(maxEmail)
            let index = emails.findIndex(e => e === maxEmail)
            emails.splice(index, 1)
            maxInterests = -1
            maxEmail = ""
        }
        let sortedUsers = []
        sortedEmails.forEach(e => sortedUsers.push(this.getUserByEmail(e)))
        return sortedUsers
    }

    @action updateFoodSearch = value => {
        let word = this.foodSearch + value
        console.log(word)
        this.foodSearch.replace(word)
    }

    @action addMatch = async email => {
        console.log("in add match function")
        let name = this.getUserByEmail(email).firstName
        let properCaseName = name[0].toUpperCase() + name.slice(1)

        this.handleMatchNotification(true, properCaseName)
        this.currentUser.matchedWith.push(email)

        await this.updateUser('matchedWith')
    }

    @action matchUsers = async email => {
        let matchedUser = await this.getUserByEmail(email)
        if (!matchedUser.matchedWith.find(e => e === this.currentUser.email)) {
            console.log("in matched user if")
            matchedUser.matchedWith.unshift(this.currentUser.email)
            await this.updateOtherUser(matchedUser, 'matchedWith')
            matchedUser = await this.getUserByEmail(email)
            console.log("matched user matched with array" + matchedUser.matchedWith)
        }

        if (!this.currentUser.matchedWith.find(e => e === email)) {
            console.log("in current user if")
            this.currentUser.matchedWith.unshift(email)
            await this.updateUser('matchedWith')
            console.log("current user matched with array" + this.currentUser.matchedWith)

            this.socket.emit('MATCH', {
                currentUser: this.currentUser.email,
                matchedUser: email
            })
        }
    }

    @action handleMatchNotification = (shouldOpen, name) => {
        this.matchNotification = {
            open: shouldOpen,
            name
        }

        console.log(this.matchNotification)
    }


    @action checkLogin = (email, password) => {
        let user = this.users.find(u => (u.email === email) && (u.password === password))
        return user ? user : null
    }

    @action changeCurrentUser = user => {
        console.log(user)
        this.currentUser = user
        sessionStorage.setItem('login', JSON.stringify(user));
    }

    @action updateFacebookDetails = (details) => {

        let splitName = details.name.split(" ")

        this.facebookDetails.push({
            firstName: splitName[0],
            lastName: splitName[1],
            email: details.email,
            pic: details.pic
        })

        console.log(this.facebookDetails)

    }

    @computed get filterFoodByBudget() {
        return this.foods.filter(f => f.budget <= this.budget)
    }

    @action checkExistUser = email => this.users.some(u => u.email.toLowerCase() === email.toLowerCase())

    // job = new CronJob('0 */1 * * * *', function() {
    //     this.getUsersFromDB()
    // })
    @action addUserLocation = async position => {
        let name = await this.getLocationName(position.coords.latitude, position.coords.longitude)
        let location = {
            name,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }
        this.currentUser.location = location
        this.updateUser("location")
    }

    getConversationById = (convId) => this.conversations.find(c => c._id === convId)

    getLocationName = async (latitude, longitude) => {
        let apiKey = "AIzaSyDyEUWonGwNpeknij5cwdp94mN4ZL7Raxo"
        let data = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?key=${apiKey}&latlng=${latitude},${longitude}&sensor=false&language=en`)
        let name = data.data.results[0].address_components[2].short_name
        console.log(name)
        return name
    }

    getDistance = (lat2, lon2) => {
        if (typeof (Number.prototype.toRad) === "undefined") {
            Number.prototype.toRad = function () {
                return this * Math.PI / 180;
            }
        }

        let lat1 = this.currentUser.location.latitude
        let lon1 = this.currentUser.location.longitude
        let R = 6371; // Radius of the earth in km
        let dLat = (lat2 - lat1).toRad(); // Javascript functions in radians
        let dLon = (lon2 - lon1).toRad();
        let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c; // Distance in km
        return Math.round(d * 100) / 100;
    }

    socketUsernameListener = () => {
        this.socket.on('GET_USERNAME', () => {
            if (this.currentUser.firstName) {
                this.socket.emit('SAVE_ID', {
                    currentUser: this.currentUser.email
                })
            }
        })

        // this.socket.on('RECEIVE_MESSAGE', function (data) {
        //     console.log(data)
        //     // this.forceUpdate()
        //     // props.generalStore.changeDummy()
        // })
    }
}