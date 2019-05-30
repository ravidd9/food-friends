import React, { Component } from 'react';
import { inject } from 'mobx-react';


@inject("generalStore")

class ChosenFood extends Component {

    changeSelectedFood = () => this.props.changeSelectedFood(this.props.selectedFood.name)

    render() {
        
        let food = this.props.selectedFood

        return (
            <div id="food" onClick={this.changeSelectedFood}>

                    <div>You've chosen :{food.name}</div>
                    <div><img src={food.pic}></img></div>
                    <div>{food.description}</div>

            </div>
        );
    }
}

export default ChosenFood;