import React from 'react';
import styles from './ChatItem.module.scss'
import classNames from "classnames";

import ChatText from "../ChatText/ChatText";
import Avatar from "../Avatar/Avatar";

type Props = {
    side?: 'left' | 'right';
}

const ChatItem = ({side = 'left'}: Props) => {

    const classes = classNames(styles.chatItem, {
        [styles.chatItemRight]: side === 'right'
    });
    return (
        <div className={classes}>
            <div className={styles.chatItemTop}>
                <Avatar/>
                <div>
                    <ChatText variant={side === 'right' ? 'fill' : 'default'}/>
                    <div className={styles.chatItemTime}>
                        <p>8:00 PM</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ChatItem;