import { observable, action, computed } from 'mobx'
import axios from '../../node_modules/axios/dist/axios'
import { async } from 'q';
import io from 'socket.io-client'
import { object } from 'prop-types';


const API_URL = 'http://localhost:8000'

export class GeneralStore {
    @observable users = []
    @observable foods = []
    @observable filteredFood = []
    @observable budget = 150
    @observable socket = io('localhost:8000');
    @observable matchNotification = { open: false, name: "" }
    @observable currentUser = JSON.parse(sessionStorage.getItem('login')) || {}
    // {
    //     _id: "5cee3ef7c5a16519f8094d69",
    //     firstName: "danny",
    //     lastName: "brudner",
    //     interests: ["raptors", "kite surfing", "entreprenuership", "programming"],
    //     interestedFood: [],
    //     email: "dannybrudner@gmail.com",
    //     password: "dannyb",
    //     profilePic: "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg",
    //     matchedWith: ""
    // }
    @observable socket = io('localhost:8000');

    getUserByEmail = email => this.users.find(u => u.email === email)

    getEmailsByUsers = users => users.map(u => u.email)

    getFoodByName = name => this.foods.find(f => f.name === name)

    @action saveUser = async (user) => {
        let randomNum = Math.floor(Math.random() * 1000) + 1;
        user.profilePic= `https://api.adorable.io/avatars/${randomNum}.jpg`
        await axios.post(`${API_URL}/user`, user)
        await this.getUsersFromDB()
    }

    @action makeActive = async () => {
        this.currentUser.isActive = true
        this.currentUser.lastSeen = new Date()

        await this.updateUserInDB(this.currentUser, 'isActive')
        await this.updateUser('lastSeen', this.currentUser)
    }

    @action saveFood = async (food) => {
        let doesExist = this.foods.some(u => u.name == food)
        console.log(doesExist)

        let foodToAdd = { name: food.toLowerCase() }

        if (doesExist) {
            return
        }
        else {
            await axios.post(`${API_URL}/food`, foodToAdd)
            await this.getFoodsFromDB()
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
        this.updateUser('interestedFood')
    }

    @action updateUser = async valueToUpdate => {
        await this.updateUserInDB(this.currentUser, valueToUpdate)
        this.updateSessionStorage(this.currentUser)

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


    @action addMatch = async email => {
        let name = this.getUserByEmail(email).firstName
        let properCaseName = name[0].toUpperCase() + name.slice(1)

        this.handleMatchNotification(true, properCaseName)
        this.currentUser.matchedWith.push(email)

        await this.updateUser('matchedWith')
    }

    @action matchUsers = async email => {
        this.currentUser.matchedWith.push(email)
        await this.updateUser('matchedWith')

        this.socket.emit('MATCH', {
            currentUser: this.currentUser.email,
            matchedUser: email
        })
    }

    @action handleMatchNotification = (shouldOpen, name) => this.matchNotification = { open: shouldOpen, name }


    @action checkLogin = (email, password) => {
        let user = this.users.find(u => (u.email === email) && (u.password === password))
        return user ? user : null
    }

    @action changeCurrentUser = user => {
        console.log(user)
        this.currentUser = user
        sessionStorage.setItem('login', JSON.stringify(user));
    }


    @computed get filterFoodByBudget() {
        return this.foods.filter(f => f.budget <= this.budget)
    }

    @action checkExistUser = email => this.users.some(u => u.email.toLowerCase() === email.toLowerCase())

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
        let dLat = (lat2 - lat1).toRad();  // Javascript functions in radians
        let dLon = (lon2 - lon1).toRad();
        let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c; // Distance in km
        return Math.round(d * 100) / 100;
    }
}
