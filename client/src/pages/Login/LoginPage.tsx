import React from 'react';
import {Link} from 'react-router-dom';
import styles from '../../components/forms/LoginForm/LoginForm.module.scss';
import LoginForm from "../../components/forms/LoginForm/LoginForm";



const LoginPage = () => {
    return (
        <div className={styles.loginContainer}>
            <div className={styles.BackButton}>
                <Link to='/'><p>Back</p></Link>
            </div>
     <LoginForm/>
        </div>
    );
};

export default LoginPage;