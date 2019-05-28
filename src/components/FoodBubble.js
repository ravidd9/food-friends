import React, { Component } from 'react';
import '../style/FoodBubble.css';
import { observer, inject } from 'mobx-react';


@inject("generalStore")
@observer
class FoodBubble extends Component {

    addFoodByName = () =>{
        this.props.generalStore.filterFoodByName(this.props.food.name)
    }

    render() {
        let food = this.props.food
        return (
            <div className="foodBubble">
                <div className="foodName">{food.name}</div>
                <div className="checkBox">
                    <input type="checkbox" name={food.name} id="" onClick={this.filterFoodByName} />
                </div>
                <div className="foodPic">
                    <img src={food.pic} alt=""/>
                </div>
                <div className="foodDesc">{food.description}</div>
            </div>
        );
    }
}

export default FoodBubble;