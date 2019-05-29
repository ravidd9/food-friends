import React, { Component } from 'react';
import '../style/HomePage.css';
import FoodContainer from './FoodContainer';
import Filters from './Filters';
import { observer, inject } from 'mobx-react';


@inject("generalStore")
@observer
class HomePage extends Component {

    render() {
        return (
            <div id="homePage">
                <h2>Welcome, {this.props.generalStore.currentUser.firstName}</h2>
                <FoodContainer/>
                <Filters/>
            </div>
        );
    }
}
    
export default HomePage;