import React from 'react';
import styles from './ChatText.module.scss';
import classNames from "classnames";


type Props = {
    variant?: 'fill' | 'default'
}

const ChatText = ({variant = 'default'}: Props) => {
    const classes = classNames(styles.chatText, {
        [styles.chatTextFill]: variant === 'fill'
    });
    return (
        <div className={classes}>
            <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
        </div>
    );
};

export default ChatText;