import React, { Component } from 'react';
import '../style/Register.css';


class Register extends Component {

    changeLogin = () =>{
        this.props.changeLogin()
    }

    render() {
        return (
            <div id="register">
                <div>Sign Up and find your Food-Friend today</div>
                <div id="registerForm">
                    <div>First Name</div>
                    <input type="text" placeholder="Enter First Name" name="firstName"/>
                    <div>Last Name</div>
                    <input type="text" placeholder="Enter Last Name" name="lastName"/>
                    <div>Email</div>
                    <input type="text" placeholder="Enter Email" name="email"/>
                    <div>Password</div>
                    <input type="text" placeholder="Enter Password" name="password"/>
                </div>
                <button id="registerButton">Sign Up</button>
                <div id="navigateToLogin">
                    <span> Already a member?, </span>
                    <span id="loginLink" onClick={this.changeLogin}>Login</span>
                </div>
            </div>
        );
    }
}

export default Register;