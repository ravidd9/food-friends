import React, { Component } from 'react';
import '../style/InterestedUser.css';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom'

@inject("generalStore")
@observer
class InterestedUser extends Component {
    constructor() {
        super()
        this.state = {
            haveMatched: false
        }
    }

    matchUsers = () => {
        this.setState({ haveMatched: true })
        this.props.generalStore.matchUsers(this.props.user.email)
    }


    render() {

        let user = this.props.user

        return (
            <div className="interestedUser">
                <div className="profilePic"><img src={user.profilePic} alt="" /></div>
                <div className="firstName">{user.firstName}</div>
                <div className="interests">
                    Interestes : {user.interests.map(i => <span className="inter">{i}</span>)}
                </div>
                <div className="interests">
                    Would love to eat : {user.interestedFood.map(i => <span className="inter">{i}</span>)}
                </div>
                {!this.state.haveMatched ?
                    <button onClick={this.matchUsers}>Match !</button> :
                    <Link to="show-match"><button onClick={this.showMatch}>Show match !</button></Link>
                }

            </div>

        );
    }
}

export default InterestedUser;