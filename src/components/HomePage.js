import React, { Component } from 'react';
import '../style/HomePage.css';
import FoodContainer from './FoodContainer';
import Filters from './Filters';


class HomePage extends Component {

    render() {
        return (
            <div id="homePage">
                <FoodContainer/>
                <Filters/>
            </div>
        );
    }
}
    
export default HomePage;