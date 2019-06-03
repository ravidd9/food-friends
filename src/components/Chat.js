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
            username: props.generalStore.currentUser.firstName,
            message: '',
            messages: [],
        };


        this.socket.on('RECEIVE_MESSAGE', function (data) {
            // alert("Matching")
            props.generalStore.addMessage(data)
        })

    }
    
    sendMessage = ev => {
        ev.preventDefault();
        this.socket.emit('SEND_MESSAGE', {
            author: this.state.username,
            message: this.state.message,
            recipient: this.props.generalStore.currentUser.matchedWith[0]
        })
        this.setState({ message: '' });

    }

    render() {
        return (
            <div>
                <div className="chatView">
                    {this.state.messages.map(m => {
                        return (
                            <div>{m.author} : {m.message}</div>
                        )
                    })}
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