import React, { Component } from 'react';
import '../style/HomePage.css';
import FoodContainer from './FoodContainer';
import Filters from './Filters';
import io from 'socket.io-client'
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router-dom'

@inject("generalStore")
@observer
class HomePage extends Component {

    constructor() {
        super()
        this.socket = io('localhost:8000');

        this.socket.on('SEND_MATCH', function (data) {
            this.props.generalStore.addMatch(data);
        });
    }

    logout = () =>{
        sessionStorage.removeItem("login")
        window.location = "http://localhost:3000/" 
    }

    render() {
        let generalStore = this.props.generalStore
        return (
            <div id="homePage">
                {generalStore.currentUser.firstName ?
                    <div>
                        <h2>Welcome, {generalStore.currentUser.firstName}</h2>
                        <button onClick={this.logout}>Log Out</button>
                        <FoodContainer />
                        <Filters />
                    </div> :
                    <Redirect to="/" />}
            </div>
        );
    }
}

export default HomePage;