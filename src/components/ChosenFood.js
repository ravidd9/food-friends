import React, { Component } from 'react';
import { inject } from 'mobx-react';
import "../style/ChosenFood.css"

@inject("generalStore")

class ChosenFood extends Component {

    changeSelectedFood = () => this.props.changeSelectedFood(this.props.selectedFood)

    render() {
        let generalStore = this.props.generalStore
        let food = generalStore.getFoodByName(this.props.selectedFood)

        return (
            <div onClick={this.changeSelectedFood} className="picAndText">
                <img src={food.pic} className={food.name === this.props.currentFood ? "selected-image" : ""}></img>
                <div className="text">{food.name.toUpperCase()}</div>
            </div>
        );
    }
}

export default ChosenFood;