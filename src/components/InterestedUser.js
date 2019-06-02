import React, { Component } from 'react';
import '../style/InterestedUser.css';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom'
import "../style/InterestedUser.css"

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
                <span className="profilePic">
                    <img src={user.profilePic} />
                    <span className="nameContainer">
                        <span className="name">{user.firstName.toUpperCase()} {user.lastName.toUpperCase()}</span>
                        <span className="interests">
                            INTERESTS : {user.interests.map((inter, i) => <span key={i} className="inter">{inter.toUpperCase()} </span>)}
                        </span>
                    </span>
                </span>


                {/* <span className="wouldLove">
                    PARTNET FOR : {user.interestedFood.map(i => <span className="inter">{i.toUpperCase()} </span>)}
                </span> */}
                {!this.state.haveMatched ?
                    <span className="match" onClick={this.matchUsers}>Match !</span> :
                    <Link to="show-match"><span className="show-match" onClick={this.showMatch}>CHAT</span></Link>
                }

            </div>

        );
    }
}

export default InterestedUser;