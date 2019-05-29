import React, { Component } from 'react';
import '../style/InterestedUser.css';

import { inject, observer } from 'mobx-react';

@inject("generalStore")
@observer
class InterestedUser extends Component {
    render() {
        
        let user = this.props.user

        return (
            <div className="interestedUser">
                <div className="profilePic"><img src={user.profilePic} alt=""/></div>
                <div className="firstName">{user.firstName}</div>
                <div className="interests">
                   Interestes : {user.interests.map(i => <span className="inter">{i}</span>)}
                </div>
                <div className="interests">
                   Would love to eat : {user.interestedFood.map(i => <span className="inter">{i}</span>)}
                </div>
            </div>
    
        );
    }
}

export default InterestedUser;