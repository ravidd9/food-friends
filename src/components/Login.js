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
        if(user){
            generalStore.changeCurrentUser(user)
            window.location = "http://localhost:3000/home" 
        }else{
            this.setState({ invalidLogin: true })
        }
    }

    render() {
        return (
            <div id="login">
                <div>Already a member?</div>
                <div id="loginForm">
                    <div>Email</div>
                    <input type="email" placeholder="Enter Email" name="email" onChange={this.handleInput} />
                    <div>Password</div>
                    <input type="password" placeholder="Enter Password" name="password" onChange={this.handleInput} />
                </div>
                <button id="loginButton" onClick={this.checkLogin} >Login</button>
                {this.state.invalidLogin ?
                    <div className="error">Wrong Email or Password</div> :
                    null}
                <div id="navigateToRegister">
                    <span> Not a member?, </span>
                    <span id="registerLink" onClick={this.changeLogin}>Sign Up</span>
                </div>
            </div>
        );
    }
}

export default Login;