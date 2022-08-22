import React from 'react';
import styles from './ProfileBlock.module.scss';
import Avatar from '../../assets/avatar.jpg'
import {Link} from "react-router-dom";
import {useAppSelector} from "../../hooks/redux";


const ProfileBlock = () => {
    const {user} = useAppSelector(state => state.authReducer);
    console.log(user)
    return (
        <div className={styles.profile}>
            <div className={styles.profileBlock}>
            <div className={styles.profileImg}>
                <img src={Avatar} alt=""/>
            </div>
            <button className={styles.profileBtn}>Редактировать</button>
            <Link to='/' className={styles.profileBtn}>Сообщения</Link>
            </div>
            <div className={styles.profileBlock}>
                <div className={styles.profileInfo}>
                    <p>{user?.username}</p>
                </div>
                <div>
                    <input placeholder='status' type="text" disabled/>
                </div>
                <div className={styles.profileInfo}>
                    <p>{user?.country}</p>
                </div>
                <div className={styles.profileInfo} >
                    <p>{user?.email}</p>
                </div>

            </div>
        </div>
    );
};

export default ProfileBlock;