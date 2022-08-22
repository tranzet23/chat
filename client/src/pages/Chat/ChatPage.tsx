import React, {useEffect} from 'react';
import Messages from "../../components/Messages/Messages";
import Chat from "../../components/Chat/Chat";

import styles from './ChatPage.module.scss'
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {fetchConversations, fetchMessages} from "../../store/chat/actionCreators";


const ChatPage = () => {
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(state => state.authReducer);
    const {conversations} = useAppSelector(state => state.chatReducer);


    const onDialogClick = (id: string) => {
        dispatch(fetchMessages(id))
    }

    useEffect(() => {
        if (!user) return;
        dispatch(fetchConversations(user._id));
    }, [dispatch, user])


    return (
        <div className={styles.wrapperChatPage}>
            <Messages conversations={conversations} onDialogClick={onDialogClick}/>
            <Chat/>
        </div>
    );
};

export default ChatPage;