import React, { Component } from 'react';
import '../style/Landing.css';
import Login from './Login';


class Landing extends Component {
    render() {
        return (
            <div id="landing">
                <h2>Welcome to Food-Friends</h2>
                <h4>the best way to find your dining mate!</h4>
                <Login />
            </div>
        );
    }
}

export default Landing;