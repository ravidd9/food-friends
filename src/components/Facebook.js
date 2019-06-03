import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import FacebookLogin from "react-facebook-login";


@inject("generalStore")
@observer
class Facebook extends Component {

    constructor() {
        super()
        this.state = {
            isLoggedIn: false,
            userID: "",
            name: "",
            email: "",
            picture: ""
        }
    }

    render() {
        let fbContent;

        if (this.state.isLoggedIn) {
            fbContent = (
                <div
                    style={{
                        width: "400px",
                        margin: "auto",
                        background: "#f4f4f4",
                        padding: "20px"
                    }}
                >
                    <img src={this.state.picture} alt={this.state.name} />
                    <h2>Welcome {this.state.name}</h2>
                    Email: {this.state.email}
                </div>
            );
        } else {
            fbContent = (
                <FacebookLogin
                    appId="189486938370592"
                    autoLoad={true}
                    fields="name,email,picture"
                    onClick={this.componentClicked}
                    callback={this.responseFacebook}
                />
            );
        }

        return <div>{fbContent}</div>;
    }
}

export default Facebook;