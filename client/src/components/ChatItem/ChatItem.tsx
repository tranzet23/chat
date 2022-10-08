import React from 'react';
import styles from './ChatItem.module.scss'
import classNames from "classnames";

import ChatText from "../ChatText/ChatText";
import Avatar from "../Avatar/Avatar";
import {useAppSelector} from "../../hooks/redux";
import {SERVER_IMAGES_URL} from "../../constants";



type Props = {
    side?: 'left' | 'right',
    text: string | number,
    time: string,
    username: string | null,
    receiverImg: string | null  | void
}



const ChatItem = ({side = 'left', text, time, username, receiverImg}: Props) => {
    const { user} = useAppSelector(state => state.authReducer);
    const classes = classNames(styles.chatItem, {
        [styles.chatItemRight]: side === 'left'
    });



    return (
        <div className={classes}>
            <div className={styles.chatItemTop}>
                <div>{
                    side === 'left'
                        ? <Avatar image={`${SERVER_IMAGES_URL}${receiverImg}`}/>
                        :    <Avatar image ={`${SERVER_IMAGES_URL}${user!.profilePicture}`}
                        />
                }
                </div>

                <div>
                    <p>
                        {side === 'left'
                            ? user?.username
                            : username}
                    </p>
                    <ChatText variant={side === 'left' ? 'fill' : 'default'}
                              text={text}/>
                    <div className={styles.chatItemTime}>
                        <p>{time}</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ChatItem;