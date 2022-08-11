import React from 'react';
import Messages from "../../components/Messages/Messages";
import Chat from "../../components/Chat/Chat";

import styles from './ChatPage.module.scss'


const ChatPage = () => {
    return (
        <div className={styles.wrapperChatPage}>
            <Messages/>
            <Chat/>
        </div>
    );
};

export default ChatPage;