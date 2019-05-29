import React, { Component } from 'react';

import { observer, inject } from 'mobx-react';


@inject("generalStore")
@observer

class ShowMatch extends Component {
    render() {
        return (
            <div>
                You've matched with : {this.props.generalStore.currentUser.matchedWith}
            </div>
        );
    }
}

export default ShowMatch;