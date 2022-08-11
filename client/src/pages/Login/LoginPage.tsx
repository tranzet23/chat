import React from 'react';
import {Link} from 'react-router-dom';
import styles from './LoginPage.module.scss';



const LoginPage = () => {
    return (
        <div className={styles.loginContainer}>
            <div className={styles.BackButton}>
                <Link to='/'><p>Back</p></Link>
            </div>
            <form className={styles.loginForm}>
                <input type="text" name="username" id="username" placeholder="Username" required autoFocus/>
                <input type="email" name="email" id="email" placeholder="E-mail" required/>
                <input type="password" name="password" id="password" placeholder="Password" required/>
                <input type="submit" name="submit" id="submit" value="REGISTER"/>
            </form>
        </div>
    );
};

export default LoginPage;