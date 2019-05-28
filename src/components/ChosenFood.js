import React, { Component } from 'react';
import { inject } from 'mobx-react';


@inject("generalStore")

let food = this.props.filteredFood

class ChosenFood extends Component {
    render() {
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