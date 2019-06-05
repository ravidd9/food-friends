import React, { Component } from 'react';
import io from "socket.io-client";
import { inject, observer } from 'mobx-react';
import axios from 'axios';
import 'react-chat-elements/dist/main.css';
import "../style/Chat.css"

import { MessageBox, MessageList, Input, Button } from 'react-chat-elements';
import UserBubble from './UserBubble';



@inject("generalStore")
@observer
class Chat extends Component {

    constructor(props) {
        super(props);
        this.socket = props.generalStore.socket

        this.state = {
            message: "",
            currentConv: 0,
            selectedUser: props.generalStore.currentUser.matchedWith[0]
        }
        

        this.socket.on('RECEIVE_MESSAGE', async function (data) {
            console.log(data)
            // this.getConversation()
        })

    }

    sendMessage = async ev => {
        ev.preventDefault();
        let data = {
            author: this.props.generalStore.currentUser.email,
            message: this.state.message,
            recipient: this.props.generalStore.currentUser.matchedWith[0]
            // recipient: this.props.generalStore.currentUser.matchedWith[0]
        }
        this.socket.emit('SEND_MESSAGE', data)
        await this.props.generalStore.addMessage(data)
        this.setState({ message: '' });
        this.refs.input.clear()

    }

    async componentDidMount() {
        await this.props.generalStore.getUsersConversationsFromDB()
    }

    async componentDidUpdate() {
        // await this.props.generalStore.getUsersConversationsFromDB()
    }

    handleChange = e => this.setState({message: e.target.value})

    render() {
        let generalStore = this.props.generalStore
        let conversations = generalStore.conversations
        let usersConvs = generalStore.getUserFromConvs()
        console.log(usersConvs)
        console.log(conversations)
        return (
            <div id="chat">
                <div id="usersContainer">
                    {usersConvs.map((u, i) => <UserBubble key={i} user={u} currentUser={this.state.selectedUser} />)}
                </div>
                <div id="chatContainer">
                    {conversations.length ? conversations[this.state.currentConv].messages.map(m =>
                        <MessageBox
                            position={m.author === generalStore.currentUser.firstName ? "left" : "right"}
                            type={'text'}
                            title={m.author}
                            text={m.text}
                            titleColor={m.author == generalStore.currentUser.firstName ? "green" : "blue"}
                            data={{
                                uri: 'https://facebook.github.io/react/img/logo.svg',
                                status: {
                                    click: false,
                                    loading: 0,
                                }
                            }} />
                    ):
                    null}

                </div>
                <div id="typeContainer">
                    <Input
                        onChange={this.handleChange}
                        placeholder="Type here..."
                        multiline={true}
                        ref='input'
                        defaultValue={this.state.message}
                        rightButtons={
                            <Button
                                type={"outlined"}
                                onClick={this.sendMessage}
                                color='white'
                                backgroundColor='blue'
                                text='Send' />
                        } />
                </div>
            </div>
        );
    }
}

export default Chat;