import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Message from './Message.jsx';
import axios from 'axios';
const url = 'ws://localhost:4040';

class Chatroom extends React.Component {
    constructor() {
        super();
        this.form = React.createRef();
        this.state = {
            message: '',
            messages: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
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
        // parse any incoming messages and add them to the message array in state
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
    // close the socket when the component unmounts
    componentWillUnmount() {
        this.connection.close();
    }

    handleLogout() {
        axios.delete('http://localhost:3000/api/logout', { data: {
            username: this.props.username,
        } });
        // calls app method setUserName to reset username state to null when user logs out
        return this.props.onClick();
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
    // send message object to wobsocket server
    sendMessage(event) {
        event.preventDefault();
        const message = {
            username: this.props.username,
            text: this.state.message
        }
        this.form.reset();
        this.connection.send(JSON.stringify(message));
    }

    render(props) {
        // create an array of message components to display messages in the chat box
        const messages = this.state.messages.map((msg, index) => (<Message key={index} text={msg.text} username={msg.username} self={this.props.username === msg.username} />));
        return (
            <div className='chatroom'>
             <div className='chats'>
                <div className='chat-list'>
                    {messages}
                </div>
                    <form ref={(el) => {this.form = el}}className='new-message' onSubmit={this.sendMessage}>
                    <input
                        type='text'
                        className='new-message-input'
                        placeholder='message'
                        onChange={this.handleChange}
                        />
                    <button className='submit' type='submit'>
                        Send
                    </button>
                </form>
            </div>
                <Link to='/login' onClick={this.handleLogout} className="logout">LOGOUT</Link> 
            </div>
        )
    }
}

export default Chatroom;