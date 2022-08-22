import React from 'react';
import styles from './Profile.module.scss'
import ProfileBlock from "../../components/ProfileBlock/ProfileBlock";

const Profile = () => {
    return (
        <div className={styles.container}>
            <ProfileBlock/>
        </div>
    );
};

export default Profile;