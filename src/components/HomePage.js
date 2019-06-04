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
        
        this.state = {
            foodInput: ""
        }

        this.socket.on('RECEIVE_MATCH', function (email) {
            props.generalStore.addMatch(email)
        })
    }
    
    handleChange = e => {
        if (e.key === "Enter") {
            this.props.generalStore.saveFood(e.target.value)
        }
    }

    addFood = () => this.props.generalStore.saveFood(this.state.foodInput)

    componentDidMount = async () => {
        let generalStore = this.props.generalStore
        if (generalStore.currentUser.firstName) {
            this.socket.emit('USER_IN', {
                currentUser: generalStore.currentUser.email
            })
        }
        await this.props.generalStore.makeActive()
        this.handleLocation()
    }

    handleLocation = () => {
        let generalStore = this.props.generalStore
        // if(generalStore.currentUser.location){

        window.navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position)
            generalStore.addUserLocation(position)
        })

        // }
    }

    updateInput = e => this.setState({foodInput: e.target.value})

    render() {
        let generalStore = this.props.generalStore
        return (
            <div id="homePage">
                {generalStore.currentUser.firstName ?
                    <div>
                        <h2>Welcome, {generalStore.currentUser.firstName}</h2>
                        <input placeholder="ADD NEW FOOD" onKeyDown={this.handleChange} onChange={this.updateInput} value={this.state.foodInput}/><button onClick={this.addFood}>ADD</button>
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