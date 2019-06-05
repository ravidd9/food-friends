import React, { Component } from 'react';
import '../style/FoodBubble.css';
import { observer, inject } from 'mobx-react';


@inject("generalStore")
@observer
class FoodBubble extends Component {

    filterFoodByName = () => {
        this.props.generalStore.filterFoodByName(this.props.food.name)
    }

    render() {
        let food = this.props.food
        return (
            <div>
                <div className={`foodBubble ${this.props.generalStore.doesExistInFilteredFood(food.name) ? "checked" : "unchecked"}`}
                    onClick={this.filterFoodByName}>
                    <img src={food.pic} alt="" />
                </div>
            </div>
        );
    }
}

export default FoodBubble;