import React from 'react';
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";


import styles from './Header.module.scss';
import Container from "../Container/Container";
import ProfileSvg from '../../assets/profile.svg';
import MessageSvg from '../../assets/message.svg';
import QuitImg from '../../assets/quit.png'
import {fetchLogout} from "../../store/auth/actionCreators";
import {User} from '../../models/User'


type Props = {}



const Header: React.FC<Props> = () => {
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(state => state.authReducer);
    const onClickLogout = (user: any) => {
        dispatch(fetchLogout(user))
    }
    return (
        <header className={styles.header}>
            <Container>
                <div className={styles.loginBtn}>
                    <div>
                        {
                            user !== null
                                ? <button className={styles.loginBtn}>{user.username}</button>
                                : <Link to='/registration' className={styles.login}>Регистрация</Link>


                        }
                    </div>
                </div>
                <Link to='/login' className={styles.loginBtn}>
                    <div>
                        {
                            user !== null
                            ? <button onClick={() => localStorage.removeItem('user')}>
                                <div
                                    onClick={onClickLogout}
                                    className={styles.quit}>
                                    <img src={QuitImg} alt=""/>
                                </div>
                            </button>
                            : <button>Войти</button>
                        }
                    </div>
                </Link>
                <button className={styles.messageBtn}>
                    <img src={MessageSvg} alt=""/>

                </button>
                <Link to='/profile' className={styles.profileBtn}>
                    <img src={ProfileSvg} alt=""/>
                </Link>
            </Container>
        </header>
    );
};

export default Header;