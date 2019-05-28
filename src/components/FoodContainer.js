import React, { Component } from 'react';
import '../style/FoodContainer.css';
import { observer, inject } from 'mobx-react';


@inject("generalStore")
@observer
class FoodContainer extends Component {
    render() {
        return (
            <div id="foodContainer">
                food container
            </div>
        );
    }
}

export default FoodContainer;