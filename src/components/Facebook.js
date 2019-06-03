import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import FacebookLogin from "react-facebook-login";
import { Redirect } from 'react-router-dom'


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


    responseFacebook = response => {
        // console.log(response);

        this.setState({
            isLoggedIn: true,
            userID: response.userID,
            name: response.name,
            email: response.email,
            picture: response.picture.data.url
        });
    };

    updateFacebookDetails = () => {
        let details = {
            name: this.state.name,
            email: this.state.email,
            pic: this.state.picture
        }
        console.log(details)
        this.props.generalStore.updateFacebookDetails(details)
    }

    facebookLogin = () => this.props.facebookLogin()

    componentClicked = () => console.log("clicked");

    render() {

        let fbContent;

        if (this.state.isLoggedIn) {
            this.facebookLogin()
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
                    appId="465846097291922"
                    autoLoad={true}
                    fields="name,email,picture"
                    onClick={this.componentClicked}
                    callback={this.responseFacebook}
                />
            );
        }

        return (
            <div>
                {this.state.isLoggedIn ? this.updateFacebookDetails() : null}
                <div>{fbContent}</div>
            </div>
        )
    }
}

export default Facebook;