import React from 'react';
import styles from './Messages.module.scss'
import Search from "../Search/Search";

import PlusImg from '../../assets/plus.svg';
import AvatarImg from '../../assets/Avatar.png';
import PlayImg from '../../assets/Play.svg';
import {Conversations} from "../../models/Conversations";
import DialogTab from "../DialogTab/DialogTab";

type Props = {
    conversations: Conversations[],
    onDialogClick: (id: string) => void,
}

const Messages = ({conversations, onDialogClick}: Props) => {

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
                                   <DialogTab key={_id} id={_id} onClick={onDialogClick}/>
                                )
                            }
                        )}
                </div>
            </div>
        </div>
    );
};

export default Messages;