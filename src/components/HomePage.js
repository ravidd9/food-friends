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

    constructor(props) {
        super(props)
        this.socket = io('localhost:8000');

        this.socket.on('RECEIVE_MATCH', function(data){
            console.log(props)
            props.generalStore.addMatch(data);
        })

        this.socket.emit('USER_IN', {
            currentUser: props.generalStore.currentUser.firstName
        })
    }

    logout = () =>{
        sessionStorage.removeItem("login")
        window.location = "http://localhost:3000/" 
    }

    handleChange = e => {
        if (e.key === "Enter") {
            this.props.generalStore.saveFood(e.target.value)
        }
    }

    render() {
        let generalStore = this.props.generalStore
        return (
            <div id="homePage">
                {generalStore.currentUser.firstName ?
                    <div>
                        <h2>Welcome, {generalStore.currentUser.firstName}</h2>
                        New Food : <input onKeyDown={this.handleChange} />      
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