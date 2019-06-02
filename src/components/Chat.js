import React, { Component } from 'react';
import io from "socket.io-client";
import { inject, observer } from 'mobx-react';


@inject("generalStore")
@observer
class Chat extends Component {

    constructor(props){
        super(props);
        this.socket = io('localhost:8000');

        this.state = {
            username: this.props.generalStore.currentUser.firstName,
            message: '',
            messages: []
        };


        this.socket.on('RECEIVE_MESSAGE', function(data){
            console.log("Matching")
            // addMessage(data);
        });

        const addMessage = data => {
            console.log(data);
            let chat = []
            chat.push(data.message)
            this.setState({messages: chat});
            // console.log(this.state.messages);
        };

        this.sendMessage = ev => {
            ev.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                author: this.state.username,
                message: this.state.message,
                recipient: 'danny'
            })
            this.setState({message: ''});

        }
    }
    render(){
        return (
            <div className="card-footer">
            {this.state.messages.map((m,i) => <div key={i}> {this.state.username} : {m} </div>)}
            <input type="text" placeholder="Message" className="form-control" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/>
            <br/>
            <button onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>
        </div>
        );
    }
}

export default Chat;