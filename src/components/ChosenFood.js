import React, { Component } from 'react';
import { inject } from 'mobx-react';
import "../style/ChosenFood.css"

@inject("generalStore")

class ChosenFood extends Component {

    changeSelectedFood = () => this.props.changeSelectedFood(this.props.selectedFood.name)

    render() {

        let food = this.props.selectedFood

        return (

             <div id="food" onClick={this.changeSelectedFood}>
                
                <span className="picAndText">
                    <img src={food.pic}></img>
                    <div className="text">YOU'VE CHOSEN :{food.name.toUpperCase()}
                    <div className="desc">{food.description}</div></div>
                
                </span>

            </div>
        );
    }
}

export default ChosenFood;