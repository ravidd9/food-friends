import React, { Component } from 'react';
import io from "socket.io-client";
import { inject, observer } from 'mobx-react';
import axios from 'axios';


@inject("generalStore")
@observer
class Chat extends Component {

    constructor(props) {
        super(props);
        this.socket = props.generalStore.socket

        this.state = {
            message: ""
        }

        this.socket.on('RECEIVE_MESSAGE', function (data) {
            console.log(data)
            props.generalStore.addMessage(data)
        })

    }

    sendMessage = ev => {
        ev.preventDefault();
        this.socket.emit('SEND_MESSAGE', {
            author: this.props.generalStore.currentUser.email,
            message: this.state.message,
            recipient: this.props.generalStore.currentUser.matchedWith[0]
        })
        this.setState({ message: '' });

    }

    render() {

        // let userConversation = this.props.generalStore.currentUser.conversations

        // console.log(userConversation)

        return (
            <div>
                <div className="chatView">

                </div>
                <div className="card-footer">
                    <input type="text" placeholder="Message" className="form-control" value={this.state.message} onChange={ev => this.setState({ message: ev.target.value })} />
                    <br />
                    <button onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>
                </div>
            </div>
        );
    }
}

export default Chat;