import React, {useEffect, useState} from 'react';
import styles from './ProfileBlock.module.scss';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {fetchAllUsers} from "../../store/profile/actionCreator";
import PostList from "../PostList/PostList";
import MyButton from "../UI/button/MyButton";
import MyModal from "../UI/MyModal/MyModal";
import PostForm from "../forms/PostForm/PostForm";
import ProfileForm from "../forms/ProfileForm/ProfileForm";
import ProfileSidebar from "../ProfileSidebar/ProfileSidebar";
import {IPost, PostForUpdate} from "../../models/Post";
import {fetchCreatePost, fetchDeletePost, fetchPosts} from "../../store/post/actionCreators";
import Loader from "../UI/Loader/Loader";
import {User} from "../../models/User";
import Sidebar from "../Sidebar/Sidebar";


export type Props = {
    profile: User;
}


const ProfileBlock = ({profile}: Props) => {
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(state => state.authReducer)
    const {posts, isLoading} = useAppSelector(state => state.postReducer)
    const [modal, setModal] = useState(false)
    const [isAddMode, setIsAddMode] = useState(false)

    const objToFetchPosts = {
        userId: profile._id,
        username: profile.username,
    }
    const createPost = (newPost: IPost) => {
        setModal(false)
        dispatch(fetchCreatePost(newPost))
        dispatch(fetchPosts(objToFetchPosts))
    }


    const onClickGetUsers = () => {
        dispatch(fetchAllUsers())
    }

    useEffect(() => {
        dispatch(fetchPosts(objToFetchPosts)
        )

    }, [dispatch])

    return (
        <div className={styles.profile}>
            <Sidebar/>
            <div className={styles.profileInformation}>
                <div className={styles.profileMain}>
                    <ProfileSidebar setEdit={setIsAddMode} getUsers={onClickGetUsers} profile={profile} user={user}/>
                    <ProfileForm profile={profile} setEdit={setIsAddMode} edit={isAddMode}/>
                </div>
                <hr style={{marginTop: '15px'}}/>
                {user?._id === profile._id &&
                    <MyButton onClick={() => setModal(true)} className={styles.postsBtn}>
                        Создать пост
                    </MyButton>}
                <MyModal visible={modal} setVisible={setModal}>
                    <PostForm create={createPost}/>
                </MyModal>

                {isLoading
                    ? <div className={'center'}><Loader/></div>
                    :
                    <PostList posts={posts} title={'Список постов'} profile={profile} user={user}/>
                }

            </div>

        </div>
    );
};

export default ProfileBlock;