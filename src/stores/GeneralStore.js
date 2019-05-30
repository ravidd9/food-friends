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
    @observable filteredFoodArray = []
    @observable interestedUsers = []
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
    @observable matchedUser = "yossi"
    @observable socket = io('localhost:8000');





    @action saveUser = async (user) => {
        let newUser = await axios.post(`${API_URL}/user`, user)
        this.users.push(newUser)
    }
    @action saveFood = async (food) => {


        let doesExist = this.foods.some(u => u.name == food)
        console.log(doesExist)

        let foodToAdd = { name: food.toLowerCase() }

        if (doesExist) {
            return
        }
        else {
            let newFood = await axios.post(`${API_URL}/food`, foodToAdd)
            this.foods.push(foodToAdd)
        }
    }
    @action getUsers = async () => {
        let users = await axios.get(`${API_URL}/users`)
        this.users = users.data
        return users.data
    }
    @action getFoods = async () => {
        let foods = await axios.get(`${API_URL}/foods`)
        this.foods = foods.data
        return foods.data
    }

    @action filterFoodByName = async (selectedFood) => {
        if (this.doesExistInFilteredFood(selectedFood)) {
            let indexOfSelected = this.filteredFood.findIndex(f => f.name === selectedFood)
            this.filteredFood.splice(indexOfSelected, 1)
        } else {
            let foodItem = this.foods.find(f => f.name === selectedFood)
            this.filteredFood.push(foodItem)
        }
    }

    doesExistInFilteredFood = selectedFood => this.filteredFood.some(f => f.name === selectedFood)

    @action addInterestedFood = async () => {
        let filteredFoodNames = []
        this.filteredFood.forEach(f => filteredFoodNames.push(f.name))
        this.currentUser.interestedFood = filteredFoodNames
        this.users.find(u => u.email === this.currentUser.email).interestedFood = filteredFoodNames
        let updatedUser = await axios.put(`${API_URL}/user/interestedFood`, this.currentUser)
    }

    @action findUsersByFoodName = () => {

        let users = []

        for (let foodItem of this.filteredFood) {
            let usersWithFood = this.users.filter(u => u.interestedFood.some(f => f === foodItem.name))
            usersWithFood.forEach(u => users.push(u))
        }

        return users
    }

    // @action match = userToMatch => {
    //     // ev.preventDefault();
    //     this.socket.emit('MATCH', {
    //         email: this.currentUser.email,
    //         password: this.currentUser.password,
    //         matchedUser: userToMatch
    //     })
    //     // this.setState({ message: '' });
    // }


    @action addMatch = data => {
        console.log(data);
        alert(data)
        // this.matchedUser = data
        // this.setState({ messages: [...this.state.messages, data] });

        // console.log(this.state.messages);
    }

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


    @action checkLogin = (email, password) => {
        let user = this.users.find(u => (u.email === email) && (u.password === password))
        return user ? user : null
    }

    @action changeCurrentUser = user => {
        console.log(user)
        this.currentUser = user
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

    @action filterFoodByBudget = budget => this.filteredFoodArray = this.foods.filter(f => f.budget <= budget)

    @action checkExistUser = email => this.users.some(u => u.email.toLowerCase() === email.toLowerCase())

    @action addUser = async (firstName, lastName, email, password, interests) => {
        let user = { firstName, lastName, email, password, interests }
        let newUser = await axios.post(`${API_URL}/user`, user)
    }

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


        console.log(rating)
        let emails = Object.keys(rating)
        let sortedEmails = []
        let maxInterests = 0
        let maxEmail = ""
        for (let i = 0; i < emails.length; i++) {

            for (let j = i; j < emails.length; j++) {
                if (rating[emails[j]] > maxInterests) {
                    maxInterests = rating[emails[j]]
                    maxEmail = emails[j]
                }
            }


            sortedEmails.push(maxEmail)
            maxInterests = 0
        }

        console.log(sortedEmails)
    }

}
