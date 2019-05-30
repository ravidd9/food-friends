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
        let interestedUsers = this.props.generalStore.interestedUsers

        return (
            <div className="foodRoom">

                {selectedFoods.map((s, i) => <ChosenFood key={i} selectedFood={s} />)}

                <div className="whosInterested">
                    <InterestedUsers />
                </div>
            </div>
        );
    }
}

export default FoodRoom;