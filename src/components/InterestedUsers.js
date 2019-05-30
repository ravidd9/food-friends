import React, { Component } from 'react';
import '../style/InterestedUsers.css';
import InterestedUser from './InterestedUser';
import { inject, observer } from 'mobx-react';

@inject("generalStore")
@observer

class InterestedUsers extends Component {

    getInterestedUsers = () => {
        let filteredFoods = this.props.generalStore.filteredFood
        let users = []
        for(let foodItem of filteredFoods) {
           foodItem.interestedUsers.forEach(u => users.push(u))
        }

        return users
    }


    render() {

        let users = this.props.generalStore.findUsersByFoodName()
    
        // let users = this.getInterestedUsers()

        return (
            <div id="interestedUsers">
                {users.filter(u => u.interestedFood.some(f => f === this.props.selectedFood)).map((u, i) => <InterestedUser key={i} user={u} />)}
            </div>
        );
    }
}

export default InterestedUsers;