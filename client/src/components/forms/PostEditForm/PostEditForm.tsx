import React, {useEffect} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import classNames from "classnames";

import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import styles from "../../PostList/PostList.module.scss";
import {IPost, PostForUpdate} from "../../../models/Post";
import MyButton from "../../UI/button/MyButton";
import { fetchPosts, fetchUpdatePost} from "../../../store/post/actionCreators";



type Props = {
    post: IPost;
    editPost: boolean;
    setEditPost: (e: boolean) => void;
    number: string | number;
}

const PostEditForm = ({post, editPost, setEditPost, number}: Props) => {
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(state => state.authReducer)
    const {userProfile} = useAppSelector(state => state.userReducer)
    const {register, handleSubmit, formState: {errors}} = useForm<IPost>({
        mode: 'onChange'
    });

    const objToFetchPosts = {
        userId: userProfile!._id,
        username: userProfile!.username,
    }

    const onSubmit: SubmitHandler<IPost> = (values) => {

        const UpdatePost: PostForUpdate = {
            postId: post!._id,
            userId: user!._id,
            desc: values.desc,
            title: values.title,
            _id: post!._id
        }
        dispatch(fetchUpdatePost(UpdatePost))
        setEditPost(false)
        dispatch(fetchPosts(objToFetchPosts))
    }

    const classes = classNames(styles.formPostEdit, {
        [styles.formPostEditEditMode]: editPost
    });


    return (
        <form className={classes} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.postNumber}>{number}. </div>
            <div className={styles.postNameInput}>Заголовок поста</div>
            <input className={styles.inputTitle}
                   {...register('title', {
                       required: true,
                       minLength: 4,
                   })}
                   placeholder='Название поста'
                   defaultValue={post!.title}
                   disabled={!editPost}
            />
            {errors.title && errors.title.type === "required" &&
                <span className={styles.error}>Необходимо заполнить</span>}
            {errors.title && errors.title.type === "minLength" &&
                <span className={styles.error}>Минимальное число символов 4</span>}
            <div className={styles.postNameInput}>Описание поста</div>
            <input
                {...register('desc', {
                    required: true,
                    minLength: 8,
                })}
                placeholder='Описание поста'
                defaultValue={post!.desc}
                disabled={!editPost}
            />
            {errors.desc && errors.desc.type === "required" &&
                <span className={styles.error}>Необходимо заполнить</span>}
            {errors.desc && errors.desc.type === "minLength" &&
                <span className={styles.error}>Минимальное число символов 8</span>}


            {editPost &&
                <div className={styles.btnWrap}>
                    <MyButton
                        type={'submit'}>
                        Подтвердить редактирование
                    </MyButton>
                    <MyButton className={'borderRed'}
                              onClick={() => {
                                  setEditPost(false)
                              }}>
                        Отменить
                    </MyButton>
                </div>
            }
        </form>
    );
};

export default PostEditForm;