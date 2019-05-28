import React, { Component } from 'react';
import '../style/FoodContainer.css';
import { observer, inject } from 'mobx-react';
import FoodBubble from './FoodBubble';
import { async } from 'q';
import {Link} from 'react-router-dom'


@inject("generalStore")
@observer
class FoodContainer extends Component {

    addInterestedUser = () => this.props.generalStore.addInterestedUser()
    
    render() {
        let foods = this.props.generalStore.foods
        console.log(foods)
        return (
            <div id="foodContainer">
                
                {foods.map((f,i) => <FoodBubble key={i} food={f} />)}
                {<Link to="/food-room"><div id="searchSelected" onClick={this.addInterestedUser}>Search</div></Link>}
            </div>
        );
    }
}

export default FoodContainer;