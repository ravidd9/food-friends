import React, { Component } from 'react';
import '../style/HomePage.css';
import FoodContainer from './FoodContainer';
import Filters from './Filters';
import io from 'socket.io-client'
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router-dom'
import { Spring } from 'react-spring/renderprops';
import D3 from './D3';
import FabButton from './FabButton'



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

    updateFoodSearch = e => {
        this.props.generalStore.foodSearch = e.target.value
    }

    addInterestedFood = () => {
        let generalStore = this.props.generalStore
        if (generalStore.filteredFood[0]) {
            generalStore.addInterestedFood()
            window.location = `${generalStore.WINDOW_LOCATION}/food-room`
        }
    }

    render() {

        let generalStore = this.props.generalStore

        return (

            // <Spring
            //     from={{ opacity: 0.25 }}
            //     to={{ opacity: 1 }}
            // >
            //     {props => (
            //         <div style={props}>

            <div id="homePage">
                {generalStore.currentUser.firstName ?
                    <div id="homePageContainer">
                        <h4>Welcome back, {generalStore.currentUser.firstName[0].toUpperCase() + generalStore.currentUser.firstName.slice(1)}</h4>
                        {/* <div id="addFood">
                            <input placeholder="ADD NEW FOOD" onKeyDown={this.handleChange} onChange={this.updateInput} value={this.state.foodInput} />
                            <button onClick={this.addFood}>ADD</button>
                        </div> */}
                        <div id="searchFood">
                            <input id="filter-food" placeholder="Type to filter your food" onChange={this.updateFoodSearch} />
                        </div>

                        {/* <Filters /> */}
                        <FoodContainer />
                        {/* <D3 /> */}
                    </div> :
                    <Redirect to="/" />}
                {/* {this.state.chat? <Redirect to="/chat"/>  : null} */}
                <div id="fab-container" onClick={this.addInterestedFood}><FabButton /></div>
            </div>


        );
    }
}

export default HomePage;