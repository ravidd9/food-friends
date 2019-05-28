import { observable, action, computed } from  'mobx'
import axios from 'axios'



export class GeneralStore {
    @observable users = []
    @observable foods = []
    @action saveUser = async (user) => {
        let newUser = await axios.post(`/user`, user)
        this.users.push(newUser)
    } 
    @action saveFood = async (food) => {
        let newFood = await axios.post(`/food`, food)
        this.foods.push(newFood)
    } 
    @action getUsers = async () =>{
        let users = await axios.get('/users')
        return users.data
    }
    @action getFoods = async () =>{
        let foods = await axios.get('/foods')
        return foods.data
    }
}
