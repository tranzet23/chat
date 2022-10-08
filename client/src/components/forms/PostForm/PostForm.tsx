import React, {useState} from 'react';
import MyButton from "../../UI/button/MyButton";
import MyInput from "../../UI/input/MyInput";
import styles from '../../PostList/PostList.module.scss'
import {useAppSelector} from "../../../hooks/redux";



type PostForm = {
    create: (newPost: any) => void;
}


const PostForm = ({create}: PostForm) => {
    const {user} = useAppSelector(state => state.authReducer)
    const [post, setPost] = useState({title: '', desc: ''})

    const addNewPost = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()

        const newPost = {
            ...post, _id: Date.now(), userId: user?._id

        }
        create(newPost);
        setPost({title: '', desc: ''})

    }

    return (
        <form className={styles.postListWrap}>
            <MyInput
                value={post.title}
                onChange={(e: {
                    target: { value: string; };
                }) => {
                    setPost({...post, title: e.target.value});
                }}
                type="text"
                placeholder={"Название поста"}/>
            <MyInput
                value={post.desc}
                onChange={(e: {
                    target: { value: string; };
                }) => setPost({...post, desc: e.target.value})}
                type="text"
                placeholder={"Описание поста"}/>
            <hr style={{marginTop: '10px'}}/>
            <MyButton className={'dfg'} onClick={addNewPost}>Создать пост</MyButton>
        </form>
    );
};

export default PostForm;