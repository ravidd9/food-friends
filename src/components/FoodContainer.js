import React, { Component } from 'react';
import '../style/FoodContainer.css';
import { observer, inject } from 'mobx-react';
import FoodBubble from './FoodBubble';
import { async } from 'q';
import { Link } from 'react-router-dom'


@inject("generalStore")
@observer
class FoodContainer extends Component {

    addInterestedFood = () => this.props.generalStore.addInterestedFood()


    render() {

        let foods = this.props.generalStore.filterFoodByBudget
        
        return (
            <div>
                <Link to="/food-room"><div id="searchSelected" onClick={this.addInterestedFood}>SEARCH</div></Link>
                <div id="foodContainer">
                    {foods.map((f, i) => <FoodBubble key={i} food={f} />)}
                </div>
            </div>
        );
    }
}

export default FoodContainer;