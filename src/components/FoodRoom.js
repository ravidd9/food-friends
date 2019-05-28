import React, { Component } from 'react';
import '../style/FoodRoom.css';
import ChosenFood from './ChosenFood';
import { inject, observer } from 'mobx-react';
import InterestedUsers from './InterestedUsers';

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

                <div className="whosInterested">Who's interested?</div>
                <InterestedUsers />
            </div>
        );
    }
}

export default FoodRoom;