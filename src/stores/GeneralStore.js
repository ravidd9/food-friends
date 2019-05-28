import { observable, action, computed } from  'mobx'
import axios from 'axios'



export class GeneralStore {
    @observable users = []
    @observable foods = []
    @action saveUser = async (user) => {
        let newUser = await axios.post(`http://localhost:8000/user`, user)
        this.users.push(newUser)
    } 
    @action saveFood = async (food) => {
        let newFood = await axios.post(`http://localhost:8000/food`, food)
        this.foods.push(newFood)
    } 
    @action getUsers = async () =>{
        let users = await axios.get('http://localhost:8000/users')
        this.users = users.data
        return users.data
    }
    @action getFoods = async () =>{
        let foods = await axios.get('http://localhost:8000/foods')
        this.foods = foods.data
        return foods.data
    }
    // @action getFoodsByName = async (array) =>{
    //     let foods = this.getFoods()
    //     foods.filter
    // }
}
