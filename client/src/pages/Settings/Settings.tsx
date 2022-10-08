import React, {useState} from 'react';
import styles from './Settings.module.scss'
import Container from "../../components/Container/Container";
import Sidebar from "../../components/Sidebar/Sidebar";
import ProfileForm from "../../components/forms/ProfileForm/ProfileForm";
import {User} from "../../models/User";
import MyButton from "../../components/UI/button/MyButton";


type Props = {
    user: User | null;
}

const Settings = ({user}:Props) => {
    const [edit, setEdit] = useState(false)

    return (
        <Container flex={'flex'}>
            <Sidebar/>
            <div className={styles.content}>
                <h1>Общее</h1>
                <ProfileForm edit={edit} setEdit={setEdit} profile={user} colorBgGray/>
                {
                   !edit && <div className={'center'}>
                        <MyButton onClick={() => setEdit(true)} className={styles.profileBtn}>Редактировать</MyButton>
                    </div>
                }
            </div>
        </Container>
    );
};

export default Settings;