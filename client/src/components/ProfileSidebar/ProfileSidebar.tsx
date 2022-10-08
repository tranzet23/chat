import React, {useState} from 'react';
import styles from "../ProfileBlock/ProfileBlock.module.scss";
import Avatar from "../../assets/avatar.jpg";
import {Link} from "react-router-dom";
import {User} from "../../models/User";
import {SERVER_IMAGES_URL} from "../../constants";
import MyModal from "../UI/MyModal/MyModal";
import MyButton from "../UI/button/MyButton";
import classNames from "classnames";


export type Props = {
    getUsers: () => void;
    setEdit: (edit: boolean) => void;
    user: User | null;
    profile: User;
}


const ProfileSidebar = ({user, profile, setEdit}: Props) => {
    const [modal, setModal] = useState(false)

    const classes = classNames(styles.profileBlock, {
        [styles.profileBlockSidebar]: user
    });

    const AddToFriend = () => {

    }
    return (
        <div className={classes}>
            <div className={styles.profileImg}
                 onClick={() => setModal(true)}
            >
                <img src=
                         {profile.profilePicture !== '' ? `${SERVER_IMAGES_URL}${profile.profilePicture}` : Avatar}
                />
            </div>

            {user && user._id !== profile._id
                ? <MyButton onClick={() => AddToFriend}>Добавить в друзья</MyButton>
                : ''}
            <MyModal visible={modal} setVisible={setModal} modalPicture={true} close>
                <img src=
                         {profile.profilePicture !== '' ? `${SERVER_IMAGES_URL}${profile.profilePicture}` : Avatar}
                />
            </MyModal>
            <Link to='/'
                  className={styles.profileBtn}>
                {user && user._id === profile._id
                    ? 'Мессенджер'
                    : 'Написать сообщение'}
            </Link>

        </div>
    )
};

export default ProfileSidebar;