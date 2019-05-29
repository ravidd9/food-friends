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
                <div className={`foodBubble ${this.props.generalStore.doesExistInFilteredFood(food.name) ? "checked" : null}`}
                    onClick={this.filterFoodByName}>
                    <div className="foodName">{food.name}</div>
                    <div className="foodPic"><img src={food.pic} alt="" /></div>
                    <div>{food.budget}₪</div>
                </div>
            </div>
        );
    }
}

export default FoodBubble;