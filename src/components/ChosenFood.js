import React, { Component } from 'react';
import { inject } from 'mobx-react';
import "../style/ChosenFood.css"

@inject("generalStore")

class ChosenFood extends Component {

    changeSelectedFood = () => this.props.changeSelectedFood(this.props.selectedFood.name)

    render() {

        let food = this.props.selectedFood

        return (

             
                
                <span onClick={this.changeSelectedFood} className="picAndText">
                    {food.name === this.props.currentFood ? <img src={food.pic} className="selected-image"></img> : <img src={food.pic}></img>}
                    <div className="text">{food.name.toUpperCase()}</div>
                </span>

            
        );
    }
}

export default ChosenFood;