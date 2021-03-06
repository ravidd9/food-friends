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
            haveMatched: false,

        }
    }

    matchUsers = async () => {
        let currentUser = this.props.generalStore.currentUser.email 
        let matchedUser = this.props.user.email

        let newConversation = {
            users: [currentUser, matchedUser],
            messages: [{
                author: "",
                text: "",
                time: null
            }]
        }

        await this.setState({ haveMatched: true })
        await this.props.generalStore.matchUsers(this.props.user.email)
        await this.props.generalStore.addConversation(newConversation, matchedUser)
    }


    render() {

        let user = this.props.user

        return (
            <div className="interestedUser">
                <div className="profilePic">
                    <img src={user.profilePic} />
                </div>
                <div className="name">{user.firstName.toUpperCase()} {user.lastName.toUpperCase()}</div>
                <div className="interests">
                    {user.interests.map((inter, i) =>
                        <span className="inter" key={i}>{inter.toUpperCase()}</span>)}
                </div>

                {user.location ?
                    <div className="location">
                        <div>{user.location.name}</div>
                        <div>{this.props.generalStore.getDistance(user.location.latitude, user.location.longitude)} km away</div>
                    </div> :
                    null
                }

                {!this.state.haveMatched ?
                    <div className="btn1 match" onClick={this.matchUsers}>Match</div> :
                    <div className="btn1 chat"><Link to="/show-match">Chat</Link></div>
                }

                <div className="prefs">
                    <div>{user.vegan ? "Vegan" : null}</div>
                    <div>{user.vegetarian ? "Vegetarian" : null}</div>
                    <div>{user.kosher ? "Kosher" : null}</div>
                    {/* <img src="../vegan.png" alt=""/>
                    <img src="" alt=""/>
                    <img src="" alt=""/> */}
                </div>
            </div >

        );
    }
}

export default InterestedUser;