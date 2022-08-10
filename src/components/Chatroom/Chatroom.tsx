import React from 'react';
import styles from './Chatroom.module.scss'
import ChatItem from "../ChatItem/ChatItem";

const Chatroom = () => {
    return (
        <div className={styles.chatroomContainer}>
            <ChatItem side='right'/>
            <ChatItem/>
        </div>
    );
};

export default Chatroom;