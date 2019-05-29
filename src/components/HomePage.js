import React, { Component } from 'react';
import '../style/HomePage.css';
import FoodContainer from './FoodContainer';
import Filters from './Filters';
import io from 'socket.io-client'
import { observer, inject } from 'mobx-react';

@inject("generalStore")
@observer
class HomePage extends Component {

    constructor() {
        super()
        this.socket = io('localhost:8000');

        this.socket.on('SEND_MATCH', function(data){
            this.props.generalStore.addMatch(data);
        });
    }

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