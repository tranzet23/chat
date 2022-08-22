import React from 'react';
import styles from './ChatText.module.scss';
import classNames from "classnames";


type Props = {
    variant?: 'fill' | 'default';
    text: string | number,
}

const ChatText = ({variant = 'default', text}: Props) => {
    const classes = classNames(styles.chatText, {
        [styles.chatTextFill]: variant === 'fill'
    });
    return (
        <div className={classes}>
            <p>{text}</p>
        </div>
    );
};

export default ChatText;