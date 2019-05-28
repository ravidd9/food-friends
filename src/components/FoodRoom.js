import React, { Component } from 'react';
import '../style/FoodRoom.css';
import ChosenFood from './ChosenFood';
import { inject } from 'mobx-react';
import { observable } from 'mobx';
import InterestedUser from './InterestedUser';


@inject("generalStore")

@observable

let selectedFoods = this.props.generalStore.filteredFoods
let interestedUsers = this.props.generalStore.interestedUsers

class FoodRoom extends Component {
    render() {
        return (
            <div className="foodRoom">
                Your'e chosen foods are :

                <div className="chosenFoods">
                    {selectedFoods.map(s => <ChosenFood selectedFood={s} />)}
                </div>

                Who's interested?
                <div className="whosInterested">
                    {interestedUsers.map(i => <InterestedUser user={i} />)}
                </div>
            </div>
        );
    }
}

export default FoodRoom;