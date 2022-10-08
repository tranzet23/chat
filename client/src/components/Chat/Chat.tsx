import React, {useEffect, useState} from 'react';
import classNames from "classnames";
import { useAppSelector} from "../../hooks/redux";

import styles from './Chat.module.scss';
import AvatarImg from '../../assets/Avatar.png';
import PhoneImg from '../../assets/phone.svg';
import CameraImg from '../../assets/videocam.svg';
import InfoImg from '../../assets/info.svg';
import Send from "../Send/Send";
import Chatroom from "../Chatroom/Chatroom";
import {Message} from "../../models/Message";
import {ConversationUser} from "../../models/ConversationUser";
import Avatar from "../Avatar/Avatar";
import {SERVER_IMAGES_URL} from "../../constants";



type Props = {
    messages: Message[];
    onSubmit: (text: string) => void;
    state: 'default' | 'empty';
    conversationUsers: ConversationUser[]

}

const Chat = ({messages, onSubmit, state = 'default', conversationUsers}: Props) => {
    const [username, setUsername] = useState<string | null>(null);
    const [receiverAvatar, setReceiverAvatar] = useState<string | null  | void>('');
    const {conversations, currentConversation} = useAppSelector(state => state.chatReducer);

    const classes = classNames(styles.chatContainer, {
        [styles.chatContainerEmpty]: state === 'empty'
    });

    useEffect(() => {
        if(!conversationUsers.length || !currentConversation) return;

        const { user: { username}} = conversationUsers?.filter((conv) => conv.conversationId === currentConversation?._id)[0];
        const { user: { profilePicture}} = conversationUsers?.filter((conv) => conv.conversationId === currentConversation?._id)[0];

        setUsername(username);
        setReceiverAvatar(profilePicture)

    }, [conversationUsers, currentConversation])


    return (
        <div className={classes}>
            <div className={styles.top}>
                <div className={styles.topWrapper}>
                    <div className={styles.topLeftContent}>
                        <div className={styles.avatar}>
                            <Avatar image={receiverAvatar !== ''
                            ? `${SERVER_IMAGES_URL}${receiverAvatar}`
                            : `${SERVER_IMAGES_URL}${AvatarImg}`}/>

                        </div>
                        <div className={styles.profileInfo}>
                            {username &&  <p>{username}</p>}
                        </div>
                    </div>
                    <div className={styles.topButtons}>
                        <button><img src={PhoneImg} alt=""/></button>
                        <button><img src={CameraImg} alt=""/></button>
                        <button><img src={InfoImg} alt=""/></button>
                    </div>
                </div>
            </div>
            <Chatroom receiverImg={receiverAvatar} messages={messages} username={username}/>
            {conversations.length > 0
                ? <Send onSubmit={onSubmit}/>
                : ''
            }

        </div>
    );
};

export default Chat;