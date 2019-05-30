import React, { Component } from 'react';
import '../style/FoodRoom.css';
import ChosenFood from './ChosenFood';
import { inject, observer } from 'mobx-react';
import InterestedUsers from './InterestedUsers';

@inject("generalStore")
@observer

class FoodRoom extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedFood: props.generalStore.filteredFood[0].name
        }
    }

    changeSelectedFood = foodName => this.setState({selectedFood: foodName})

    render() {

        let selectedFoods = this.props.generalStore.filteredFood
        let interestedUsers = this.props.generalStore.interestedUsers

        
        
        return (
            <div className="foodRoom">
                {/* Your'e chosen foods are : */}

                <div className="chosenFoods">
                    {selectedFoods.map((s, i) => <ChosenFood key={i} selectedFood={s} currentFood={this.state.selectedFood} changeSelectedFood={this.changeSelectedFood} />)}
                </div>


                {/* Who's interested? */}
                <div className="whosInterested">
                    <InterestedUsers selectedFood={this.state.selectedFood} />
                </div>
            </div>
        );
    }
}

export default FoodRoom;