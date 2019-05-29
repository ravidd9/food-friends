import React, { Component } from 'react';
import '../style/HomePage.css';
import FoodContainer from './FoodContainer';
import Filters from './Filters';
import io from 'socket.io-client'
import { observer, inject } from 'mobx-react';

@inject("generalStore")
@observer
class HomePage extends Component {

    constructor(props) {
        super(props)
        this.socket = io('localhost:8000');

        this.socket.on('RECEIVE_MATCH', function(data){
            console.log(props)
            props.generalStore.addMatch(data);
        })
    }

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