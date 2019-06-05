import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import "../style/ChosenFood.css"

@inject("generalStore")
@observer

class ChosenFood extends Component {

    changeSelectedFood = () => this.props.changeSelectedFood(this.props.selectedFood)

    render() {
        let generalStore = this.props.generalStore
        console.log(this.props.selectedFood)
        let food = generalStore.getFoodByName(this.props.selectedFood)
        console.log(food)

        return (
            <div className="chosenFood">
                {food ?
                    <div onClick={this.changeSelectedFood} className="picAndText">
                        <img src={food.pic} className={food.name === this.props.currentFood ? "selected-image" : ""}></img>
                        <div className="text">{food.name.toUpperCase()}</div>
                    </div> :
                    null
                }
            </div>
        );
    }
}

export default ChosenFood;