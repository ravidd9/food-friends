import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import TagsInput from 'react-tagsinput'
import { Redirect } from 'react-router-dom'


import '../style/Profile.css';


@inject("generalStore")
@observer
class Profile extends Component {
    constructor() {
        super()
        this.state = {
            oldPass1: "",
            oldPass2: "",
            newPass: "",
            interests: [],
            error: ""
        }
    }

    handleInput = e => this.setState({ [e.target.name]: e.target.value })

    handleChange = interests => {
        this.setState({ interests })
    }

    changePassword = () => {
        let generalStore = this.props.generalStore
        this.setState({ error: "" })
        if (this.state.oldPass1 && this.state.oldPass2 && this.state.newPass) {

            if (this.state.oldPass1 === this.state.oldPass2) {
                if (generalStore.currentUser.password === this.state.oldPass1) {
                    generalStore.currentUser.password = this.state.newPass
                    generalStore.updateUser("password")
                } else {
                    this.setState({ error: "Wrong old password (input #1)" })
                }
            } else {
                this.setState({ error: "Old Passwords do not match" })
            }
        } else {
            this.setState({ error: "Empty Fields" })
        }
    }

    saveInterests = () => {
        let generalStore = this.props.generalStore
        generalStore.currentUser.interests = this.state.interests
        generalStore.updateUser("interests")
    }

    componentDidMount = () => this.setState({ interests: this.props.generalStore.currentUser.interests })

    render() {
        let generalStore = this.props.generalStore
        return (
            <div id="profile">
                {generalStore.currentUser.firstName ?
                    <div id="profileForms">
                        <div id="passwordChange">
                            <h2>Change Password</h2>
                            <input type="password" name="oldPass1" onChange={this.handleInput} placeholder="Enter Old Password" />
                            <input type="password" name="oldPass2" onChange={this.handleInput} placeholder="Re-Enter Old Password" />
                            <input type="password" name="newPass" onChange={this.handleInput} placeholder="Enter New Password" />
                            <button onClick={this.changePassword}>Change Password</button>
                            <div className="error">{this.state.error}</div>
                        </div>
                        <div id="interestsChange">
                            <h2>Update interests</h2>
                            <TagsInput value={this.state.interests} onChange={this.handleChange} />
                            <button onClick={this.saveInterests}>Save</button>
                        </div>
                    </div> :
                    <Redirect to="/" />}
            </div>
        );
    }
}

export default Profile;