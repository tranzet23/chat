import React, {useEffect, useState} from 'react';
import classNames from "classnames";
import {Controller, SubmitHandler, useForm} from "react-hook-form";

import styles from "../../ProfileBlock/ProfileBlock.module.scss";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {User, UserForUpdate} from "../../../models/User";
import MyButton from "../../UI/button/MyButton";
import {fetchAllUsers, fetchUpdateProfile} from "../../../store/profile/actionCreator";
import ReactSelect from "react-select";
import {countries} from "../../../data/countries";
import {getValueSelect, IOption} from "../RegisterForm/RegisterForm";
import {convertToBase64} from "../../../utils";

export type Props = {
    edit: boolean;
    setEdit: (boolean: boolean) => void;
    profile: User | null;
    colorBgGray?: boolean;
}

type FormValues = {
    email: string,
    country: string,
    username: string,
    userPhotos: FileList,
    desc: string,
    age: string | number,
    city: string,
    linkToSocial: string,
}

const ProfileForm = ({edit, setEdit, profile, colorBgGray}: Props) => {
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(state => state.authReducer);
    const [more, setMore] = useState(false)

    const {register, handleSubmit, control, formState: {errors}} = useForm<FormValues>({
        mode: 'onChange'
    });

    const onSubmit: SubmitHandler<FormValues> = async (values) => {
        const file = values.userPhotos[0];
        let userPicture = file ? await convertToBase64(file) as string : user!.profilePicture

        console.log(userPicture)

        const Obj: UserForUpdate = {
            userCurrentId: user!._id,
            userForUpdateId: user!._id,
            isAdmin: user!.role === 'admin',
            email: values.email,
            country: values.country,
            username: values.username,
            profilePicture: userPicture,
            userId: user!._id,
            desc: values.desc,
            age: values.age,
            city: values.city,
            linkToSocial: values.linkToSocial,
        }

        const UserUpdate: User = {
            country: values.country,
            username: values.username,
            profilePicture: userPicture,
            email: values.email,
            _id: user!._id,
            role: user!.role,
            desc: values.desc,
            age: values.age,
            city: values.city,
            linkToSocial: values.linkToSocial,
        }


        dispatch(fetchUpdateProfile({user: Obj, isMyProfile: true}));
        setEdit(false)
        console.log(user)
    }

    const onClickCancellation = () => {
        setEdit(false);
    }

    const classes = classNames(styles.profileBlock, {
        [styles.profileBlockEdit]: edit === true,
        [styles.profileBlockBgGray]: colorBgGray === true,
    });

    const classesId = classNames(styles.profileInfo, {
        [styles.profileInfoId]: user
    });


    return (
        <form className={classes} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.profileInfo}>
                <div className={styles.profileBlockTitle}>Имя:</div>
                <input
                    {...register('username', {
                        required: true,
                        minLength: 4,
                    })}
                    placeholder='Имя'
                    defaultValue={profile!.username}/>
                {errors.username && errors.username.type === "required" &&
                    <span className={styles.error}>Необходимо заполнить</span>}
                {errors.username && errors.username.type === "minLength" &&
                    <span className={styles.error}>Минимальное число символов 4</span>}
            </div>
            <div className={styles.profileInfo}>
                <div className={styles.profileBlockTitle}>Почта:</div>
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
                    defaultValue={profile!.email}/>

                {errors?.email && (<span className={styles.error}>{errors.email.message}</span>)}
                {errors.email && errors.email.type === "minLength" &&
                    <span className={styles.error}>Минимальное число символов 5</span>}
            </div>
            <div className={classesId}>
                <div className={styles.profileBlockTitle}>ID:</div>
                <input defaultValue={profile!._id}/>
            </div>
            <div className={styles.profileBlockTitle}>Страна</div>
            {!edit
                ? <div className={styles.profileInfo}>
                    <input defaultValue={profile!.country}/>
                </div>
                : <div className={styles.profileSelectWrap}>
                    <Controller
                        control={control}
                        name='country'
                        rules={{
                            required: 'Выберите страну!'
                        }}
                        render={({field: {onChange, value}, fieldState: {error}}) => (
                            <div>
                                <ReactSelect
                                    className={styles.profileSelect}
                                    placeholder={profile!.country}
                                    options={countries}
                                    isDisabled={!edit}
                                    value={getValueSelect(value)}
                                    onChange={(newValue) => onChange((newValue as IOption).value)}
                                    defaultValue={profile!.country}
                                />
                                {error && <div style={{color: 'red'}}>{error.message}
                                </div>}
                            </div>
                        )}
                    />
                </div>
            }

            <div className={styles.btnShow}>
                <MyButton type="button"
                    onClick={() => !more ? setMore(true) : setMore(false)}>
                    {!more ? 'Показать подробную информацию' : 'Скрыть подробную информацию'}
                </MyButton>
            </div>
            {
                more ? <div className={styles.showBlock}>
                        <div className={styles.profileInfo}>
                            <div className={styles.profileBlockTitle}>О себе:</div>
                            <input
                                {...register('desc', {
                                    required: false,
                                })}
                                defaultValue={profile!.desc}/>
                        </div>
                        <div className={styles.profileBlockTitle}>Город:</div>
                        <div className={styles.profileInfo}>
                            <input
                                {...register('city', {
                                    required: false,
                                })}
                                defaultValue={profile!.city}/>
                        </div>
                        <div className={styles.profileInfo}>
                            <div className={styles.profileBlockTitle}>Социальная сеть:</div>
                            <input
                                {...register('linkToSocial', {
                                    required: false,
                                })}
                                defaultValue={profile!.linkToSocial}/>
                        </div>
                        <div className={styles.profileInfo}>
                            <div className={styles.profileBlockTitle}>Дата рождения:</div>
                            <input
                                {...register('age', {
                                    required: false,
                                })}
                                defaultValue={profile!.age}/>
                        </div>
                    </div>
                    : ''
            }


            {edit &&
                <div className={styles.profileInfo}>
                    <label className={styles.profileUpload}>
                        {profile!.profilePicture === '' ? 'Загрузить аватар' : 'Изменить аватар'}
                        <input

                            {...register('userPhotos', {
                                required: false,
                            })}
                            type="file"
                            accept=".jpeg, .png, .jpg"
                        />
                    </label>
                </div>
            }


            {edit &&
                <div className={styles.btnWrap}>
                    <MyButton
                        type={'submit'}>
                        Подтвердить редактирование
                    </MyButton>
                    <MyButton className={'borderRed'}
                              onClick={() => onClickCancellation}
                              type="button"
                    >
                        Отменить
                    </MyButton>
                </div>
            }
        </form>
    );
};

export default ProfileForm;