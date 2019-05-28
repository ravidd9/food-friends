import React, { Component } from 'react';
import { inject } from 'mobx-react';


@inject("generalStore")

class ChosenFood extends Component {
    render() {
        
        let food = this.props.selectedFood

        return (
            <div id="food">

                    <span>{food.name}</span>
                    <span>{food.pic}</span>
                    <span>{food.description}</span>

            </div>
        );
    }
}

export default ChosenFood;