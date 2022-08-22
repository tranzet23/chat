import React from 'react';
import styles from "../Messages/Messages.module.scss";
import AvatarImg from "../../assets/Avatar.png";


type Props = {
    id: string;
    onClick: (id: string) => void;
}

const DialogTab = ({id, onClick}:Props) => {

    const handlerDialogClick = () => {
        return onClick(id);
    }

    return (
        <div key={id} className={styles.messageItem}  onClick={handlerDialogClick}>
            <div className={styles.messageAvatar}>
                <img src={AvatarImg} alt=""/>
            </div>
            <div className={styles.messageTitle}>
                <p>{id}</p>
                <p>{'text'}</p>
            </div>
            <div className={styles.messageTimes}>
                <p>{'timeText'}</p>
                <p>{'time'}</p>
            </div>
            <button className={styles.buttonPlay}>
                <img src={'button'} alt=""/>
            </button>
        </div>
    );
};

export default DialogTab;