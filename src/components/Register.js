import React, { Component } from 'react';
import '../style/Register.css';
import { observer, inject } from 'mobx-react';


@inject("generalStore")
@observer
class Register extends Component {
    constructor() {
        super()
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            invalidInput: false,
            userExist: false
        }
    }

    handleInput = e => this.setState({ [e.target.name]: e.target.value })

    changeLogin = () => this.props.changeLogin()

    checkRegister = async () => {
        this.setState({ userExist: false, invalidInput: false })
        let generalStore = this.props.generalStore
        let s = this.state
        if (s.firstName && s.lastName && s.email && s.password) {
            if (generalStore.checkExistUser(this.state.email)) {
                this.setState({ userExist: true })
            }
            else {
                await generalStore.addUser(s.firstName, s.lastName, s.email, s.password)
                this.changeLogin()
            }
        } else {
            this.setState({ invalidInput: true })
        }
    }

    render() {
        return (
            <div id="register">
                <div>Sign Up and find your Food-Friend today</div>
                <div id="registerForm">
                    <div>First Name</div>
                    <input type="text" placeholder="Enter First Name" name="firstName" onChange={this.handleInput} />
                    <div>Last Name</div>
                    <input type="text" placeholder="Enter Last Name" name="lastName" onChange={this.handleInput} />
                    <div>Email</div>
                    <input type="text" placeholder="Enter Email" name="email" onChange={this.handleInput} />
                    <div>Password</div>
                    <input type="text" placeholder="Enter Password" name="password" onChange={this.handleInput} />
                </div>
                <button id="registerButton" onClick={this.checkRegister}>Sign Up</button>
                {this.state.invalidInput ?
                    <div id="invalidInput">Empty Fields</div> :
                    null}
                {this.state.userExist ?
                    <div id="userExist">Email already in use</div> :
                    null}
                <div id="navigateToLogin">
                    <span> Already a member?, </span>
                    <span id="loginLink" onClick={this.changeLogin}>Login</span>
                </div>
            </div>
        );
    }
}

export default Register;