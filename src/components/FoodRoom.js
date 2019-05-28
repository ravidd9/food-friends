import React, { Component } from 'react';
import '../style/FoodRoom.css';
import ChosenFood from './ChosenFood';
import { inject, observer } from 'mobx-react';

@inject("generalStore")
@observer

class FoodRoom extends Component {

    render() {

        let selectedFoods = this.props.generalStore.filteredFood
        console.log(selectedFoods)

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