import { observable, action } from  'mobx'

export class GeneralStore {
    @observable name
    @observable numPeople
    @action handleInput = (name, value) => {
        this[name] = value
    } 
}
