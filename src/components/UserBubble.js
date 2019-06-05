import React, { Component } from 'react';
import "../style/UserBubble.css"


class UserBubble extends Component {

    changeSelectedUser = () => this.props.changeSelectedUser(this.props.user, this.props.index)

    render() {
        let user = this.props.user

        return (
            <div className="userBubble">
                {this.props.currentUser ?
                    <div className="picAndText" onClick={this.changeSelectedUser}>
                        <img src={user.profilePic} id={user.email === this.props.currentUser.email ? "selected-user" : ""} />
                        <div className="userName">{user.firstName}</div>
                    </div> :
                    null
                }
            </div>
        );
    }
}

export default UserBubble;