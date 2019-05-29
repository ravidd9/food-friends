import { observable, action, computed } from 'mobx'
import axios from '../../node_modules/axios/dist/axios'
import { async } from 'q';

const API_URL = 'http://localhost:8000'

export class GeneralStore {
    @observable users = []
    @observable foods = []
    @observable filteredFood = []
    @observable interestedUsers = []
    @observable currentUserId = "5ced1ac68246e63300e82914"


    
    @action saveUser = async (user) => {
        let newUser = await axios.post(`${API_URL}/user`, user)
        this.users.push(newUser)
    }
    @action saveFood = async (food) => {
        let newFood = await axios.post(`${API_URL}/food`, food)
        this.foods.push(newFood)
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
        this.users.find(u => u._id === this.currentUser._id).interestedFood.push()
        this.filteredFood.forEach(f => {
            this.currentUser.interestedFood.push(f.name)
            this.users.find(u => u._id === this.currentUser._id).interestedFood.push(f.name)
        })
        let updatedUser = await axios.put(`${API_URL}/user/fiteredFood`, this.currentUser)
        console.log(updatedUser)
    }
    
    @action findUsersByFoodName = () => {

        let users = []
        
        for(let foodItem of this.filteredFood) {
            let usersWithFood = this.users.filter(u => u.interestedFood.some(f => f === foodItem.name))
            usersWithFood.forEach(u => users.push(u))
        }

        return users
    }
}
