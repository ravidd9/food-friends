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
            conversations: "",
            currentConv: 0
        }

        this.socket.on('RECEIVE_MESSAGE', async function (data) {
            console.log(data)
            await props.generalStore.addMessage(data)
            this.getConversation()
        })

    }

    getConversation = () => this.setState({ conversation: this.props.generalStore.conversations })
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
        let generalStore = this.props.generalStore
        let usersConvs = [{ name: "danny", pic: "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg" }]
        let conversations = [
            {
                id: "ravidAnddanny",
                users: ["ravidd9@gmail.com", "dannybrudner@gmail.com"],
                messages: [
                    {
                        author: "ravid",
                        text: "hi",
                        time: new Date()
                    },
                    {
                        author: "danny",
                        text: "hello",
                        time: new Date()
                    }
                ]
            }
        ]

        // let conversations = this.props.generalStore.currentUser.conversations
        // let currentChat = generalStore.getMessageList(conversations[this.state.currentConv].messages)
        // let usersConvs= generalStore.getUsersConvs()

        return (
            <div id="chat">
                <div id="usersContainer">
                    {usersConvs.map((u, i) => <UserBubble key={i} user={u} />)}
                </div>
                <div id="chatContainer">
                    {conversations[this.state.currentConv].messages.map(m =>
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
                    )}

                </div>
                <div id="typeContainer">
                    <Input
                        placeholder="Type here..."
                        multiline={true}
                        rightButtons={
                            <Button
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