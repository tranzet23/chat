import React, {useEffect, useState} from 'react';
import styles from './Messages.module.scss'
import Search from "../Search/Search";

import PlusImg from '../../assets/plus.svg';
import AvatarImg from '../../assets/Avatar.png';
import PlayImg from '../../assets/Play.svg';
import {Conversations} from "../../models/Conversations";
import DialogTab from "../DialogTab/DialogTab";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {fetchAllUsers} from "../../store/profile/actionCreator";
import {ConversationUser} from "../../models/ConversationUser";

type Props = {
    conversations: Conversations[],
    onDialogClick: (id: string) => void,
    conversationUsers: ConversationUser[]
}

const Messages = ({conversations, onDialogClick, conversationUsers}: Props) => {

    const {currentConversation} = useAppSelector(state => state.chatReducer);

    return (
        <div className={styles.messages}>
            <div className={styles.messagesContainer}>
                <h2>Сообщения</h2>
                <div className={styles.messagesTop}>
                    <Search/>
                    <button className={styles.buttonPlus}>
                        <p>Чат</p>
                        <img src={PlusImg} alt=""/>
                    </button>
                </div>

                <div className={styles.messagesContent}>
                    {
                        conversations.map(({_id}) => {
                                return (
                                   <DialogTab key={_id}
                                              id={_id}
                                              conversationUsers={conversationUsers}
                                              onClick={onDialogClick}
                                              state={_id === currentConversation?._id ? "active" : 'default'}/>
                                )
                            }
                        )}
                </div>
            </div>
        </div>
    );
};

export default Messages;