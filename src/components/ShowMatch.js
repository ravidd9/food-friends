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
            </div>
        );
    }
}


export default ShowMatch;