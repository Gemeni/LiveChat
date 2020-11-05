import React from 'react';
import '../styles/index.css';

const bubbleDirection = () => {

}
const Message = ({ text, username, self }) => (
    <div className={`bubble-container ${self ? '' :'bubble-direction-reverse'}`}>
        <p className='message-username'>{username}</p>
        <p className={`bubble ${self ? 'you' : 'me' }`}>{text}</p>
    </div>
)

export default Message; 