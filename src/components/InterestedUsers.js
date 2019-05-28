import React, { Component } from 'react';
import '../style/InterestedUsers.css';
import InterestedUser from './InterestedUser';


class InterestedUsers extends Component {
    render() {
        let users = this.props.InterestedUsers
        return (
            <div id="interestedUsers">
                {users.map((u,i) => <InterestedUser key={i} user={u} />)}
            </div>
        );
    }
}

export default InterestedUsers;