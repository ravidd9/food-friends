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

    // addFood = () => this.props.generalStore.saveFood(this.state.foodInput)

    componentDidMount = async () => {
        await this.props.generalStore.makeActive()
        this.handleLocation()
    }

    handleLocation = () => {
        let generalStore = this.props.generalStore
        if (generalStore.currentUser.location) {
            window.navigator.geolocation.getCurrentPosition(function (position) {
                console.log(position)
                generalStore.addUserLocation(position)
            })
        }
    }

    updateFoodSearch = e => this.props.generalStore.foodSearch = e.target.value

    render() {
        let generalStore = this.props.generalStore
        return (
         
         <div id="homePage">
                {generalStore.currentUser.firstName ?
                    <div id="homePageContainer">
                        <h2>Welcome, {generalStore.currentUser.firstName}</h2>
                        {/* <div id="addFood">
                            <input placeholder="ADD NEW FOOD" onKeyDown={this.handleChange} onChange={this.updateInput} value={this.state.foodInput} />
                            <button onClick={this.addFood}>ADD</button>
                        </div> */}
                        <div id="searchFood">
                            <input placeholder="Enter Search query" onChange={this.updateFoodSearch} value={generalStore.foodSearch} />
                        </div>

                        {/* <Filters /> */}
                        <FoodContainer />
                    </div> :
                    <Redirect to="/" />}
                {/* {this.state.chat? <Redirect to="/chat"/>  : null} */}
            </div>
    
            
        );
    }
}

export default HomePage;