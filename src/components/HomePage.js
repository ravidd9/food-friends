import React, { Component } from 'react';
import '../style/HomePage.css';
import FoodContainer from './FoodContainer';
import Filters from './Filters';
import io from 'socket.io-client'
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router-dom'
import Chat from './Chat';

@inject("generalStore")
@observer
class HomePage extends Component {

    constructor(props) {
        super(props)
        this.socket = props.generalStore.socket

        this.socket.on('RECEIVE_MATCH', function (email) {
            props.generalStore.addMatch(email)
        })
    }

    logout = () => {
        sessionStorage.removeItem("login")
        window.location = "http://localhost:3000/"
    }

    handleChange = e => {
        if (e.key === "Enter") {
            this.props.generalStore.saveFood(e.target.value)
        }
    }

    componentDidMount = () => {
        let generalStore = this.props.generalStore
        if (generalStore.currentUser.firstName) {
            this.socket.emit('USER_IN', {
                currentUser: generalStore.currentUser.email
            })
        }
        this.handleLocation()
    }

    handleLocation = () => {
        let generalStore = this.props.generalStore
        if(generalStore.currentUser.location.name){
            window.navigator.geolocation.getCurrentPosition(function (position) {
                console.log(position)
                generalStore.addUserLocation(position)
            })

            await this.props.generalStore.makeActive()
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
                        <Filters />
                        <FoodContainer />
                    </div> :
                    <Redirect to="/" />}
                {/* {this.state.chat? <Redirect to="/chat"/>  : null} */}
            </div>
        );
    }
}

export default HomePage;