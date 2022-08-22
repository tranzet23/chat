import React from 'react';
import styles from './Chatroom.module.scss'
import ChatItem from "../ChatItem/ChatItem";
import {Messages} from "../../models/Messages";
import {useAppSelector} from "../../hooks/redux";


type Props = {
    messages: Messages[]

}

const Chatroom = ({messages}: Props) => {
    const {user} = useAppSelector(state => state.authReducer);
    return (
        <div className={styles.chatroomContainer}>
            {
                messages.map(({text, _id, sender, createdAt}) => {
                    let timeMessage = new Date(createdAt)
                    let hour = timeMessage.getHours().toString().length < 2 ? '0' + timeMessage.getHours() : timeMessage.getHours();
                    let min = timeMessage.getMinutes().toString().length < 2 ? '0' + timeMessage.getMinutes() : timeMessage.getMinutes();
                    let sec = timeMessage.getSeconds().toString().length < 2 ? '0' + timeMessage.getSeconds() : timeMessage.getSeconds();
                    let correct_date = `${hour}:${min}:${sec}`;

                    return (
                        <ChatItem key={_id}
                                side = {user !== null && sender === user._id  ? 'left' : 'right'}
                                  text={text}
                                  time={correct_date}
                        />
                    )
                })
            }
        </div>
    );
};

export default Chatroom;