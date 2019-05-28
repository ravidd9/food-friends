import { observable, action, computed } from  'mobx'

export class GeneralStore {
    @observable users
    @action handleInput = (name, value) => {
        this[name] = value
    } 
    @computed get something(){

    }
}
