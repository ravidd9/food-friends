import React, { Component } from 'react';
import '../style/FoodContainer.css';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom'
import FoodBubble from './FoodBubble';
import Bubble from './Bubble';



@inject("generalStore")
@observer
class FoodContainer extends Component {

    addInterestedFood = () => {
        let generalStore = this.props.generalStore
        if(generalStore.filteredFood[0]){
            generalStore.addInterestedFood()
            window.location = "http://localhost:3000/food-room" 
        }
    }

    render() {

        let foods = this.props.generalStore.filterFoodByBudget
        
        return (
            <div>
                <div id="searchSelected" onClick={this.addInterestedFood}>SEARCH</div>
                <div id="foodContainer">
                    {foods.map((f, i) => <FoodBubble key={i} food={f} />)}
                </div>
            </div>
        );
    }
}

export default FoodContainer;