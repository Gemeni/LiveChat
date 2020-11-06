import React from 'react';
import '../styles/index.css';

const Message = ({ text, username, self }) => (
    // if msg is from current user display on the left side of the screen and style with a diff color
    <div className={`bubble-container ${self ? '' :'bubble-direction-reverse'}`}>
        <span className='message-username'>{username}</span>
        <p className={`bubble ${self ? 'you' : 'me' }`}>{text}</p>
    </div>
)

export default Message; 