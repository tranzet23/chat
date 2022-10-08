import React, {useMemo} from 'react';
import styles from "../Messages/Messages.module.scss";
import AvatarImg from "../../assets/Avatar.png";
import classNames from "classnames";
import {ConversationUser} from "../../models/ConversationUser";
import Avatar from "../Avatar/Avatar";
import {SERVER_IMAGES_URL} from "../../constants";


type Props = {
    id: string;
    onClick: (id: string) => void;
    state?: 'default' | 'active';
    conversationUsers: ConversationUser[]

}

const DialogTab = ({id, onClick, conversationUsers, state = 'default'}:Props) => {
    const classes = classNames(styles.messageItem, {
      [styles.messageItemActive]: state === 'active',
    })
    const handlerDialogClick = () => {
        return onClick(id);
    }

    const getUsername = useMemo(() => {
        if(!conversationUsers.length) return;
        return conversationUsers?.filter((conv) => conv.conversationId === id)[0]?.user?.username;
    }, [conversationUsers, id]);


    const getAvatar= useMemo(() => {
        if(!conversationUsers.length) return;
        return conversationUsers?.filter((conv) => conv.conversationId === id)[0]?.user?.profilePicture;
    }, [conversationUsers, id]);


    return (
        <div key={id} className={classes}  onClick={handlerDialogClick}>
            <div className={styles.messageAvatar}>
                <Avatar image ={getAvatar !== ''
                    ? `${SERVER_IMAGES_URL}${getAvatar}` : `${SERVER_IMAGES_URL}${getAvatar}`}/>
            </div>
            <div className={styles.messageTitle}>
                { getUsername && <p>{getUsername}</p>}
                <p>{id}</p>
            </div>
            <div className={styles.messageTimes}>
                <p>{'timeText'}</p>
            </div>
        </div>
    );
};

export default DialogTab;