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
            selectedUser: null,
            conversations: props.generalStore.conversations
        }


        this.socket.on('RECEIVE_MESSAGE', async function (data) {
            console.log(data)
            // this.forceUpdate()
            await props.generalStore.getUsersConversationsFromDB()
            props.generalStore.changeDummy()
        })

    }

    changeSelectedUser = (user,index) => {
        console.log(user)
        console.log(index)
        this.setState({selectedUser: user, currentConv: index})
    }


    sendMessage = async ev => {

        let generalStore = this.props.generalStore

        ev.preventDefault();
        let data = {
            author: this.props.generalStore.currentUser.email,
            message: this.state.message,
            recipient: this.state.selectedUser.email
            // recipient: this.props.generalStore.currentUser.matchedWith[0]
        }
        console.log()
        this.socket.emit('SEND_MESSAGE', data)
        await generalStore.addMessage(data)
        this.setState({ message: '' });
        await generalStore.getUsersConversationsFromDB()
        console.log('here')
        // console.log(generalStore.conversations)
        this.refs.input.clear()
        // this.updateConv()
    }

    updateConv = () => {
        let generalStore = this.props.generalStore
        console.log('herehere')
        // this.setState({ conversations : generalStore.conversations})
    }

    async componentDidMount() {
        let userConvs = await this.props.generalStore.getUsersConversationsFromDB()
        this.setState({ selectedUser: this.props.generalStore.getUserFromConvs()[0] })

    }



    handleChange = e => this.setState({ message: e.target.value })

    render() {
        console.log("render")
        let generalStore = this.props.generalStore
        let conversations = generalStore.conversations
        // console.log(conversations[0].messages[0].text)
        let usersConvs = generalStore.getUserFromConvs()
        // console.log(usersConvs)
        console.log(conversations[this.state.currentConv])

        console.log(this.props.generalStore.dummy)
        return (
            <div id="chat">
                <div id="usersContainer">
                    {usersConvs.map((u, i) => <UserBubble key={i} index={i} user={u} currentUser={this.state.selectedUser} changeSelectedUser={this.changeSelectedUser} />)}
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
                    ) :
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
                                backgroundColor='#2ecc71'
                                text='Send' />
                        } />
                </div>
            </div>
        );
    }
}

export default Chat;