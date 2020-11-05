import React, { useState } from 'react';
import Message from './Message.jsx';
const url = 'ws://localhost:4040';

class Chatroom extends React.Component {
    constructor() {
        super();
        this.state = {
            message: '',
            messages: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    // connect to a new Websocket
    connection = new WebSocket(url);

    // when component mounts
    componentDidMount() {
        this.connection.onopen = (event) => {
            console.log('WebSocket is open now.');
        };

        this.connection.onclose = (event) => {
            console.log('WebSocket is closed now.');
            this.setState(prev => {
                return {
                    ...prev,
                    ws: new WebSocket(url),
                }
            })
        };

        this.connection.onerror = (event) => {
            console.log('WebSocket has had an error: ', event);
        };

        this.connection.onmessage = (msg) => {
        msg = JSON.parse(msg.data)
            this.setState((prevState) => {
                return {
                    ...prevState, 
                    messages: [...prevState.messages, msg],
                }
            });
        }
    }

    // on change of input box, save message to state
    handleChange(event) {
        this.setState(prevState => {
            return {
                ...prevState,
                message: event.target.value,
            }
        })
    }
    sendMessage(event) {
        event.preventDefault();
        const message = {
            username: this.props.username,
            text: this.state.message
        }
        this.connection.send(JSON.stringify(message));
    }

    render() {
        const messages = this.state.messages.map((msg, index) => (<Message key={index} text={msg.text} username={msg.username} self={this.props.username === msg.username} />));
        return (
            <div className='chats'>
                <div className='chat-list'>
                    {messages}
                </div>
                <form className='new-message'>
                    <input
                        type='text'
                        className='new-message-input'
                        placeholder='message'
                        onChange={this.handleChange}
                        />
                    <button
                        type='button'
                        onClick={this.sendMessage}
                    >
                        Send
                    </button>
                </form>
            </div>
        )
    }
}

export default Chatroom;