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
            <div>
                {this.state.login ?
                    <Login changeLogin={this.changeLogin}/> :
                    <Register changeLogin={this.changeLogin} />}
            </div>
        );
    }
}

export default Landing;