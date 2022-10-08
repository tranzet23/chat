import React from 'react';
import styles from './MyModal.module.scss'
import classNames from "classnames";

type Modal = {
    children: any;
    visible: boolean;
    setVisible: Function;
    modalPicture?: boolean;
    close?: boolean;
}


const MyModal = ({children, visible, setVisible, modalPicture, close}: Modal) => {

    const classes = classNames(styles.myModal, {
        [styles.myModalActive]: visible,
        [styles.myModalPicture]: modalPicture,
    });


    return (
        <div
            className={classes}
            onClick={() => setVisible(false)}
        >
            {close ?<button className={styles.myModalClose}>X</button> : ''}
            <div className={styles.myModalContent} onClick={(e) => e.stopPropagation()}>

                {children}
            </div>
        </div>
    );
};

export default MyModal;