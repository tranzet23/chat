import React from 'react';
import styles from './Chat.module.scss';

import AvatarImg from '../../assets/Avatar.png';
import PhoneImg from '../../assets/phone.svg';
import CameraImg from '../../assets/videocam.svg';
import InfoImg from '../../assets/info.svg';
import Send from "../Send/Send";
import Chatroom from "../Chatroom/Chatroom";

const Chat = () => {
    return (
        <div className={styles.chatContainer}>
            <div className={styles.top}>
                <div className={styles.topLeftContent}>
                    <div className={styles.avatar}>
                        <img src={AvatarImg} alt=""/>
                    </div>
                    <div className={styles.profileInfo}>
                        <p>Suporte ADMIN</p>
                        <p className={styles.personalId}>#CU6798H</p>
                    </div>
                </div>
                <div className={styles.topButtons}>
                    <button><img src={PhoneImg} alt=""/></button>
                    <button><img src={CameraImg} alt=""/></button>
                    <button><img src={InfoImg} alt=""/></button>
                </div>
            </div>
            <Chatroom/>
            <Send/>
        </div>
    );
};

export default Chat;