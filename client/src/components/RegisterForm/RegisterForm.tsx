import React from 'react';
import {SubmitHandler, useForm, Controller} from 'react-hook-form';
import ReactSelect from 'react-select';

import {countries} from "../../data/countries";
import {fetchRegister} from "../../store/auth/actionCreators";
import {User} from "../../models/User";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";

import styles from './RegisterForm.module.scss';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from "react-router-dom";



export interface IOption {
    value: string,
    label: string
}

// type LoginUser = Omit<User, 'country' | 'username'>;

const getValueSelect = (value: string) => value ? countries.find((option) => option.value === value) : '';


const RegisterForm = () => {
    const dispatch = useAppDispatch();
    const {isFetching} = useAppSelector(state => state.authReducer);
    let navigate = useNavigate();


    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
        watch,
        setValue,
        control
    } = useForm<User>({
        mode: 'onChange'
    });

    const onSubmit: SubmitHandler<User> = (user) => {
        dispatch(fetchRegister(user))
        reset();
        navigate('/', { replace: true });
    }

    // React.useEffect(() => {
    //     const subscription = watch((value, {name, type}) =>
    //         console.log(value, name, type));
    //     return () => subscription.unsubscribe();
    // }, [watch]);

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

            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    {...register('username', {
                        required: true,
                        minLength: 4,
                    })}
                    placeholder='Имя'
                />
                {errors.username && errors.username.type === "required" &&
                    <span className={styles.error}>Необходимо заполнить</span>}
                {errors.username && errors.username.type === "minLength" &&
                    <span className={styles.error}>Минимальное число символов 4</span>}


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


                <Controller
                    control={control}
                    name='country'
                    rules={{
                        required: 'Country is require!'
                    }}
                    render={({field: {onChange, value}, fieldState: {error}}) => (
                        <div>
                            <ReactSelect
                                placeholder='Countries'
                                options={countries}
                                value={getValueSelect(value)}
                                onChange={(newValue) => onChange((newValue as IOption).value)}
                            />
                            {error && <div style={{color: 'red'}}>{error.message}
                            </div>}
                        </div>
                    )}
                />

                <div className={styles.bntSubmitWrapper}>
                    <button
                        type={'submit'}
                        className={styles.btn}
                        disabled={isFetching}
                    >
                        Зарегестрироваться
                    </button>

                </div>

            </form>
            {/*  /TODO/ TODO: пример заполнения при клике*/}
            <div className={styles.bntExampleWrapper}>
                <button className={styles.btn} onClick={() => {
                    setValue('username', 'Maxim')
                    setValue('email', 'test@test.ru')
                    setValue('password', '87654321')
                }}>Пример полей
                </button>
            </div>
        </div>
    );
};

export default RegisterForm;