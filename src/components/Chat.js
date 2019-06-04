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
            currentConv: 0
        }

        this.socket.on('RECEIVE_MESSAGE', async function (data) {
            console.log(data)
            await props.generalStore.addMessage(data)
            this.getConversation()
        })

    }

    handleChange = e => this.setState({message: e.target.value})

    sendMessage = ev => {
        console.log("sa")
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
        let conversations = generalStore.currentUser.conversations
        let usersConvs = [{ name: "danny", pic: "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg" }]
        // let conversations = [
        //     {
        //         id: "ravidAnddanny",
        //         users: ["ravidd9@gmail.com", "dannybrudner@gmail.com"],
        //         messages: [
        //             {
        //                 author: "ravid",
        //                 text: "hi",
        //                 time: new Date()
        //             },
        //             {
        //                 author: "danny",
        //                 text: "hello",
        //                 time: new Date()
        //             }
        //         ]
        //     }
        // ]

        // let usersConvs= generalStore.getUsersConvs()
        // let currentChat = generalStore.getMessageList(conversations[this.state.currentConv].messages)

        return (
            <div id="chat">
                <div id="usersContainer">
                    {usersConvs.map((u, i) => <UserBubble key={i} user={u} />)}
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