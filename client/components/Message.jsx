import React from 'react';

const Message = ({ text, username, self }) => (
    <div className={'message' + (self ? ' message-self' : '')}>
        <p className='message-username'>{username}</p>
        <p className='message-text'>{text}</p>
    </div>
)

export default Message; 