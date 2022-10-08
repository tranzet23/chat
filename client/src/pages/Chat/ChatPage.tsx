import React, {useEffect, useState} from 'react';
import Messages from "../../components/Messages/Messages";
import Chat from "../../components/Chat/Chat";

import styles from './ChatPage.module.scss'
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {
    fetchAddMessage,
    fetchConversations,
    fetchMessages,
    fetchUsersByConversations
} from "../../store/chat/actionCreators";
import {chatSlice} from "../../store/chat/slice";
import {io, Socket} from 'socket.io-client';
import {FetchMessage} from "../../models/Message";


const ChatPage = () => {
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(state => state.authReducer);
    const {
        conversations,
        messages,
        arrivalMessage,
        currentConversation,
        conversationsUsers
    } = useAppSelector(state => state.chatReducer);

    //socket
    const [socket, setSocket] = useState<Socket | null>(null)
    useEffect(() => {
        const newSocket = io('ws://localhost:8900');
        setSocket(newSocket);
        return () => {
            newSocket.disconnect();
        }
    }, [setSocket]);

    useEffect(() => {
        if (!socket) return;

        socket.on('getMessage', (data: {
            id: string,
            conversationId: string,
            senderId: string,
            text: string,
            createdAt: string
        }) => {
            dispatch(chatSlice.actions.setArrivalMessage({
                _id: data.id,
                sender: data.senderId,
                conversationId: data.conversationId,
                text: data.text,
                createdAt: data.createdAt
            }))
        })
    }, [socket, dispatch]);

    useEffect(() => {
        if (!socket || !user) return;

        socket?.emit("addUser", user?._id)
    }, [user, socket])

    useEffect(() => {
        if (!arrivalMessage || !currentConversation) return;

        arrivalMessage &&
        currentConversation.members.includes(arrivalMessage.sender) &&
        dispatch(chatSlice.actions.addMessage(arrivalMessage))
    }, [arrivalMessage, currentConversation])

    useEffect(() => {
        if (!user) return;
        dispatch(fetchConversations(user._id));
    }, [dispatch, user])

    useEffect(() => {
        if (!currentConversation) return;

        dispatch(fetchMessages(currentConversation._id))
    }, [currentConversation, dispatch])

    useEffect(() => {
        if (!conversations.length || !user) return;
        if (!currentConversation) {

            const userLocalStorage = localStorage.getItem('newConvReceiverId');

            if (userLocalStorage) {
                let newConversation = conversations.find((item) => item.members.includes(userLocalStorage));
                if (newConversation) dispatch(chatSlice.actions.setCurrentConversation(newConversation))
            }else  {
                    const currentConversation = conversations[0];
                    dispatch(chatSlice.actions.setCurrentConversation(currentConversation))
                    dispatch(fetchMessages(currentConversation._id))
                }

        }
        localStorage.removeItem('newConvReceiverId')


    }, [conversations, user, dispatch, currentConversation])


    const onDialogClick = (id: string) => {
        const currentConversation = conversations.filter((conv) => conv._id === id)[0]
        dispatch(chatSlice.actions.setCurrentConversation(currentConversation))
    }

    const onSubmit = (text: string) => {
        if (!user || !currentConversation || !socket) return;

        const messagesData: FetchMessage = {
            text,
            conversationId: currentConversation._id,
            sender: user._id,
        }

        dispatch(fetchAddMessage(messagesData, socket, currentConversation))
    }

    useEffect(() => {
        if (!conversations.length || !user) return;

        dispatch(fetchUsersByConversations(conversations, user));
    }, [dispatch, conversations, user])


    return (
        <div className={styles.wrapperChatPage}>
            {conversations.length > 0 && conversationsUsers
                ? <Messages conversations={conversations} conversationUsers={conversationsUsers}
                            onDialogClick={onDialogClick}/>
                : <Messages conversations={conversations} conversationUsers={conversationsUsers}
                            onDialogClick={onDialogClick}/>}
            {
                conversations.length > 0 && conversationsUsers
                    ? <Chat onSubmit={onSubmit} messages={messages} conversationUsers={conversationsUsers}
                            state={'default'}/>
                    : <Chat onSubmit={onSubmit} messages={messages} conversationUsers={conversationsUsers}
                            state={'empty'}/>
            }
        </div>
    );
};

export default ChatPage;