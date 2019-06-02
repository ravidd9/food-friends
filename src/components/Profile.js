import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import TagsInput from 'react-tagsinput'

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
        if (this.state.oldPass1 && this.state.oldPass2 && this.state.newPass) {

            if (this.state.oldPass1 === this.state.oldPass2) {
                generalStore.currentUser.password = this.state.newPass
                generalStore.updateUser("password")
            } else {
                this.setState({ error: this.state.error + "Old Passwords do not match \n" })
            }
        } else {
            this.setState({ error: this.state.error + "Empty Fields \n" })
        }
    }

    componentDidMount = () => this.setState({ interests: this.props.generalStore.currentUser.interests })

    render() {
        return (
            <div id="profile">
                <div id="passwordChange">
                    <div>Change Password</div>
                    <input type="password" name="oldPass1" onChange={this.handleInput} placeholder="Enter Old Password" />
                    <input type="password" name="oldPass2" onChange={this.handleInput} placeholder="Re-Enter Old Password" />
                    <input type="password" name="newPass" onChange={this.handleInput} placeholder="Enter New Password" />
                    <button onClick={this.changePassword}>Change Password</button>
                    <div className="error">{this.state.error}</div>
                </div>
                <div id="interestsChange">
                    <TagsInput value={this.state.interests} onChange={this.handleChange} />
                </div>
            </div>
        );
    }
}

export default Profile;