import React, { Component } from 'react';
import '../style/Login.css';
import { observer, inject } from 'mobx-react';
import validator from 'validator'



@inject("generalStore")
@observer
class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
            invalidLogin: false
        }
    }

    handleInput = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    changeLogin = () => {
        this.props.changeLogin()
    }

    checkLogin = () => {
        let generalStore = this.props.generalStore
        let user = generalStore.checkLogin(this.state.email, this.state.password)
        console.log(user)

        if (user) {
            generalStore.changeCurrentUser(user)
            window.location = "http://localhost:3000/home"
        } else {
            this.setState({ invalidLogin: true })
        }
    }

    render() {
        return (
            <div id="landing">
                <h5 className="welcome-text">WELCOME TO FOOD-FRIENDS</h5    >
                <p className="welcome-text">The best way to find your dining mate!</p>
                <div id="login">
                    <div id="loginForm">
                        <input className="login-form" type="email" placeholder="Enter Email" name="email" onChange={this.handleInput} />
                        <input className="login-form" type="password" placeholder="Enter Password" name="password" onChange={this.handleInput} />
                    </div>
                    <div id="loginButton" onClick={this.checkLogin} >LOG IN</div>
                    {this.state.invalidLogin ?
                        <div className="error">Wrong Email or Password</div> :
                        null}
                    <div id="navigateToRegister">
                        <div id="registerLink" onClick={this.changeLogin}>Not a member? Sign Up</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;