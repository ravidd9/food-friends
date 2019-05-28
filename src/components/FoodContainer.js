import React, { Component } from 'react';
import '../style/FoodContainer.css';
import { observer, inject } from 'mobx-react';
import FoodBubble from './FoodBubble';
import { async } from 'q';
import {Link} from 'react-router-dom'


@inject("generalStore")
@observer
class FoodContainer extends Component {

    componentDidMount = async () =>{
        await this.props.generalStore.getFoods()
    }
    
    render() {
        let foods = this.props.generalStore.foods
        console.log(foods)
        return (
            <div id="foodContainer">
                
                {foods.map((f,i) => <FoodBubble key={i} food={f} />)}
                {/* <Link to="/foodroom"><div id="searchSelected" >Search</div></Link> */}
            </div>
        );
    }
}

export default FoodContainer;