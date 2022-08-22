import React from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';

import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {useNavigate} from "react-router-dom";
import {LoginUser} from "../../models/User";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from "./LoginForm.module.scss";
import {fetchLogin} from "../../store/auth/actionCreators";


const LoginForm = () => {
    const dispatch = useAppDispatch();
    const {isFetching} = useAppSelector(state => state.authReducer);
    let navigate = useNavigate();



    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<LoginUser>({
        mode: 'onChange'
    });


    const onSubmitLogin: SubmitHandler<LoginUser> = (user) => {
        dispatch(fetchLogin(user))
        reset();
    }


    return (
        <div className={styles.container}>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover/>

            <form onSubmit={handleSubmit(onSubmitLogin)}
                  className={styles.loginForm}>

                <input
                    {...register('email', {
                        required: `Email is required field!`,
                        pattern: {
                            value:
                                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: 'Введите корректный адрес почты!'
                        },
                        minLength: 2
                    })}
                    placeholder='Почта'
                />
                {errors?.email && (<span className={styles.error}>{errors.email.message}</span>)}
                {errors.email && errors.email.type === "minLength" &&
                    <span className={styles.error}>Минимальное число символов 5</span>}


                <input
                    {...register('password', {
                        required: `Password is required field!`,
                        minLength: 8,
                    })}
                    placeholder='Пароль'
                />
                {errors.password && errors.password.type === "required" &&
                    <span className={styles.error}>Необходимо заполнить</span>}
                {errors.password && errors.password.type === "minLength" &&
                    <span className={styles.error}>Минимальное число символов 8</span>}
                <div className={styles.bntSubmitWrapper}>
                    <button
                        type={'submit'}
                        className={styles.btn}
                        disabled={isFetching}
                    >
                        Войти
                    </button>

                </div>
            </form>
        </div>
    );
};

export default LoginForm;