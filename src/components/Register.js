import React, { Component } from 'react';
import '../style/Register.css';
import { observer, inject } from 'mobx-react';
import TagsInput from 'react-tagsinput'
import validator from 'validator'
import 'react-tagsinput/react-tagsinput.css'
import axios from 'axios';


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
            file: null
        }
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
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
                await generalStore.addUser(s.firstName, s.lastName, s.email, s.password, s.interests)
                this.changeLogin()
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

    handleChange = interests => {
        this.setState({ interests })
    }


    onFormSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append('myImage',this.state.file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post("http://localhost:8000/upload",formData,config)
            .then((response) => {
                alert("The file is successfully uploaded");
            }).catch((error) => {
        });
    }
    onChange(e) {
        this.setState({file:e.target.files[0]});
    }


    render() {
        return (
            <div id="register">

                <form onSubmit={this.onFormSubmit}>
                    <h1>File Upload</h1>
                    <input type="file" name="myImage" onChange={this.onChange} />
                    <button type="submit">Upload</button>
                </form>


                <div>Sign Up and find your Food-Friend today</div>
                <div id="registerForm">
                    <div>First Name</div>
                    <input type="text" placeholder="Enter First Name" name="firstName" onChange={this.handleInput} />
                    <div>Last Name</div>
                    <input type="text" placeholder="Enter Last Name" name="lastName" onChange={this.handleInput} />
                    <div>Email</div>
                    <input type="email" placeholder="Enter Email" name="email" onChange={this.handleInput} />
                    <div>Password</div>
                    <input type="password" placeholder="Enter Password" name="password" onChange={this.handleInput} />
                    <div>Interests</div>
                    <TagsInput value={this.state.interests} onChange={this.handleChange} />
                </div>
                <button id="registerButton" onClick={this.checkRegister}>Sign Up</button>
                {this.state.invalidInput ?
                    <div className="error">Empty Fields</div> :
                    null}
                {this.state.userExist ?
                    <div className="error">Email already in use</div> :
                    null}
                <div className="error">{this.state.error}</div>
                <div id="navigateToLogin">
                    <span> Already a member?, </span>
                    <span id="loginLink" onClick={this.changeLogin}>Login</span>
                </div>
            </div>
        );
    }
}

export default Register;