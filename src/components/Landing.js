import React, { Component } from 'react';
import '../style/Landing.css';
import Login from './Login';
import Register from './Register';
import Chat from './Chat';



class Landing extends Component {
    constructor() {
        super()
        this.state = {
            login: true
        }
    }

    changeLogin = () =>{
        this.setState({login: !this.state.login})
    }

    componentDidMount = () => {
    }

    render() {

        return (
            <div id="landing">
                <h2>Welcome to Food-Friends</h2>
                <h4>the best way to find your dining mate!</h4>
                {this.state.login ?
                    <Login changeLogin={this.changeLogin}/> :
                    <Register changeLogin={this.changeLogin} />}
            </div>
        );
    }
}

export default Landing;