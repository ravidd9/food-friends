import React, { Component } from 'react';
import '../style/Login.css';


class Login extends Component {


    render() {
        return (
            <div id="login">
                <div>Already a member?</div>
                <div id="loginForm">
                    <div>Email</div>
                    <input type="text" placeholder="Enter Email" name="email" />
                    <div>Password</div>
                    <input type="text" placeholder="Enter Password" name="password" />
                </div>
                <div>Login</div>
                <div>Not a member?, 
                    
                </div>
            </div>
        );
    }
}

export default Login;