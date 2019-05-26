import { observable, action, computed } from  'mobx'

export class GeneralStore {
    @observable name
    @observable numPeople
    @action handleInput = (name, value) => {
        this[name] = value
    } 
    @computed get something(){

    }
}
