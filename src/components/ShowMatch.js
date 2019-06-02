import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Chat from './Chat';


@inject("generalStore")
@observer

class ShowMatch extends Component {
    render() {
        return (
            <div>
                <Chat/>
                You've matched with : {this.props.generalStore.currentUser.matchedWith}
            </div>
        );
    }
}


export default ShowMatch;