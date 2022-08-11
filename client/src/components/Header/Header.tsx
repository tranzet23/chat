import React from 'react';
import { Link } from "react-router-dom";


import styles from './Header.module.scss';
import Container from "../Container/Container";
import ProfileSvg from '../../assets/profile.svg'
import MessageSvg from '../../assets/message.svg'



const Header = () => {
    return (
        <header className={styles.header}>
           <Container>
               <Link to='/login' className={styles.loginBtn}><p>Login</p></Link>
               <button className={styles.messageBtn}>
                   <img src={MessageSvg} alt=""/>

               </button>
               <button className={styles.profileBtn}>
                   <img src={ProfileSvg} alt=""/>

               </button>
           </Container>
        </header>
    );
};

export default Header;