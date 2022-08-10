import React from 'react';
import styles from './Messages.module.scss'
import Search from "../Search/Search";

import PlusImg from '../../assets/plus.svg';
import AvatarImg from '../../assets/Avatar.png';
import PlayImg from '../../assets/Play.svg';

const DataMessage = [
    {
        avatar: AvatarImg,
        title: "Suporte ADMIN",
        text: 'Pesquisar chat',
        timesText: 'Espera',
        time: '00:31:00',
        button: PlusImg
    },
    {
        avatar: AvatarImg,
        title: "Suporte ADMIN",
        text: 'Pesquisar chat',
        timesText: 'Espera',
        time: '00:31:00',
        button: PlusImg
    },
    {
        avatar: AvatarImg,
        title: "Suporte ADMIN",
        text: 'Pesquisar chat',
        timesText: 'Espera',
        time: '00:31:00',
        button: PlayImg
    },
]


const Messages = () => {
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
                        DataMessage.map(({avatar, text, timeText, title, time, button}: any, index) => {
                                return (
                                    <div key={index} className={styles.messageItem}>
                                        <div className={styles.messageAvatar}>
                                            <img src={avatar} alt=""/>
                                        </div>
                                        <div className={styles.messageTitle}>
                                            <p>{title}</p>
                                            <p>{text}</p>
                                        </div>
                                        <div className={styles.messageTimes}>
                                            <p>{timeText}</p>
                                            <p>{time}</p>
                                        </div>
                                        <button className={styles.buttonPlay}>
                                            <img src={button} alt=""/>
                                        </button>
                                    </div>
                                )
                            }
                        )}
                </div>
            </div>
        </div>
    );
};

export default Messages;