import React, { Component } from 'react';
import '../style/FoodBubble.css';
import { observer, inject } from 'mobx-react';


@inject("generalStore")
@observer
class FoodBubble extends Component {
    render() {
        return (
            <div className="foodBubble">
                
            </div>
        );
    }
}

export default FoodBubble;