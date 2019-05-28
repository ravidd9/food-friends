import React, { Component } from 'react';
import '../style/FoodRoom.css';
import ChosenFood from './ChosenFood';
import { inject } from 'mobx-react';
import { observable } from 'mobx';


@inject("generalStore")

@observable

let selectedFoods = this.props.generalStore.filteredFoods

class FoodRoom extends Component {
    render() {
        return (
            <div className="foodRoom">
                Your'e chosen foods are :

                <div className="chosenFoods">
                    {selectedFoods.map(s => <ChosenFood selectedFood={s} />)}
                </div>

                <div className="whosInterested">Who's interested?</div>
            </div>
        );
    }
}

export default FoodRoom;