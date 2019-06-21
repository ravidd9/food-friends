import React, { Component } from 'react';
import '../style/Register.css';
import { observer, inject } from 'mobx-react';
import TagsInput from 'react-tagsinput'
import validator from 'validator'
import 'react-tagsinput/react-tagsinput.css'
import FacebookLogIn from './FacebookLogIn';


@inject("generalStore")
@observer
class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            invalidInput: false,
            userExist: false,
            error: "",
            interests: [],
            file: null,
            kosher: false,
            vegan: false,
            vegetarian: false,
            isFacebookLoggidIn: false
        }

    }

    handleInput = e => this.setState({ [e.target.name]: e.target.value })

    changeLogin = () => this.props.changeLogin()

    checkRegister = async () => {
        this.checkErrors()
        this.setState({ userExist: false, invalidInput: false })

        let generalStore = this.props.generalStore
        let s = this.state

        if (s.firstName && s.lastName && s.email && s.password) {
            if (generalStore.checkExistUser(this.state.email)) {
                this.setState({ userExist: true })
            }
            else {
                this.createNewUser()
            }
        } else {
            this.setState({ invalidInput: true })
        }
    }

    checkErrors = () => {
        let error = ""
        if (!validator.isEmail(this.state.email)) {
            error += "Invalid Email\n"
        }
        this.setState({ error })
    }

    handleInterests = interests => this.setState({ interests })

    facebookLogin = async () => {

        await this.setState({ isFacebookLoggidIn: true })
        this.setState({
            firstName: this.props.generalStore.facebookDetails[0].firstName,
            lastName: this.props.generalStore.facebookDetails[0].lastName,
            email: this.props.generalStore.facebookDetails[0].email
        })
    }

    createNewUser = async () => {
        let s = this.state
        let newUser = {
            firstName: s.firstName,
            lastName: s.lastName,
            email: s.email,
            password: s.password,
            interests: s.interests,
            kosher: s.kosher,
            vegan: s.vegan,
            vegetarian: s.vegetarian,
            matchedWith: [],
            conversations: [],
            lastSeen: new Date(),
            isActive: true,
            interestedFood: []

        }
        newUser = await this.props.generalStore.saveUser(newUser)
        this.props.generalStore.changeCurrentUser(newUser)
        window.location = `${generalStore.WINDOW_LOCATION}/home`

    }

    handleCheckBox = e => this.setState({ [e.target.name]: !this.state[e.target.name] })


    render() {

        let placeholder = "Add some interests"
        return (

            <div id="register">
                <h5 className="welcome-text">WELCOME TO FOOD-FRIENDS</h5    >
                <div className="welcome-text">Sign Up and find your Food-Friend today</div>
                <div id="registerForm">
                    {/* <div>First Name</div> */}
                    <input type="text" value={this.state.firstName} placeholder="Enter First Name" name="firstName" onChange={this.handleInput} />
                    {/* <div>Last Name</div> */}
                    <input type="text" value={this.state.lastName} placeholder="Enter Last Name" name="lastName" onChange={this.handleInput} />
                    {/* <div>Email</div> */}
                    <input type="email" value={this.state.email} placeholder="Enter Email" name="email" onChange={this.handleInput} />
                    {/* <div>Password</div> */}
                    <input type="password" placeholder="Enter Password" name="password" onChange={this.handleInput} />
                    <div>Interests</div>
                    <TagsInput placeholder value={this.state.interests} onChange={this.handleInterests} />

                    <div id="preferences">
                        <input className="preferences" type="checkbox" name="kosher" onChange={this.handleCheckBox} /><span className="preferences">Kosher</span>
                        <input className="preferences" type="checkbox" name="vegan" onChange={this.handleCheckBox} /><span className="preferences">Vegan</span>
                        <input className="preferences" type="checkbox" name="vegetarian" onChange={this.handleCheckBox} /><span className="preferences">Vegetarian</span>
                    </div>
                </div>
                {/* <form onSubmit={this.onFormSubmit}>
                    <div>Upload profile picture</div>
                    <input type="file" name="myImage" onChange={this.onChange} />
                    <button type="submit">Upload</button>
                </form> */}
                <div id="registerButton" onClick={this.checkRegister}>SIGN UP</div>
                {this.state.invalidInput ?
                    <div className="error">Empty Fields</div> :
                    null}
                {this.state.userExist ?
                    <div className="error">Email already in use</div> :
                    null}
                <div className="error">{this.state.error}</div>
                <div className="signupWithFB">OR SIGN UP USING FACEBOOK</div>
                <FacebookLogIn facebookLogin={this.facebookLogin} />
                <div id="navigateToLogin">
                    <div id="loginLink" onClick={this.changeLogin}>Already a member? Login</div>
                </div>
            </div>
        );
    }
}

export default Register;