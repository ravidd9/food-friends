import React, { Component } from 'react';
import "../style/UserBubble.css"


class UserBubble extends Component {

    openUserChat = () =>{

    }

    render() {
        let user = this.props.user
        return (
            <div className="userBubble">
                <div className="userPic" onClick={this.openUserChat}>
                    <img src={user.pic} alt="" />
                </div>
                <div className="userName">{user.name}</div>
            </div>
        );
    }
}

export default UserBubble;