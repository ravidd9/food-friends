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
    @observable matchNotification = {open: false, data: ""}
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
        await axios.post(`${API_URL}/user`, user)
        await this.getUsersFromDB()
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

    updateUser = async user => await axios.put(`${API_URL}/user/interestedFood`, user)

    @action addInterestedFood = async () => {
        this.currentUser.interestedFood = this.filteredFood

        await this.updateUser(this.currentUser)
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


    @action addMatch = data => this.handleMatchNotification(true, data)

    @action matchUsers = (email) => {
        let matchedUser = this.users.find(u => u.email === email)
        this.currentUser.matchedWith = matchedUser.firstName
        // console.log(matchedUser)
        console.log(this.currentUser)
        matchedUser.matchedWith = this.currentUser.firstName
        console.log(matchedUser)

        this.socket.emit('MATCH', {
            currentUser: this.currentUser.firstName,
            matchedUser: matchedUser.firstName
        })
    }
    
    @action handleMatchNotification = (shouldOpen, data) => this.matchNotification = {open: shouldOpen, data}


    @action checkLogin = (email, password) => {
        let user = this.users.find(u => (u.email === email) && (u.password === password))
        return user ? user : null
    }

    @action changeCurrentUser = user => {
        console.log(user)
        this.currentUser = user
        sessionStorage.setItem('login', JSON.stringify(user));
    }


    @computed get filterFoodByBudget () {
        return this.foods.filter(f => f.budget <= this.budget)
    }

    @action checkExistUser = email => this.users.some(u => u.email.toLowerCase() === email.toLowerCase())

    @action addUser = async (firstName, lastName, email, password, interests) => {
        let user = { firstName, lastName, email, password, interests }
        await axios.post(`${API_URL}/user`, user)
    }

}
