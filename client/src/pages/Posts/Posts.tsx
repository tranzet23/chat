import React, {useEffect} from 'react';
import styles from './Posts.module.scss'
import Container from "../../components/Container/Container";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {fetchAllPosts, fetchUsersPosts} from "../../store/post/actionCreators";
import Sidebar from "../../components/Sidebar/Sidebar";
import PostList from "../../components/PostList/PostList";
import {User} from "../../models/User";

type Props = {
    user: User | null
}

const Posts = ({user}:Props) => {
    const dispatch = useAppDispatch()

    const {posts} = useAppSelector(state => state.postReducer)
    const {userProfile} = useAppSelector(state => state.userReducer)


    useEffect(() => {
        dispatch(fetchAllPosts())

    }, [dispatch]);

    return (
        <Container flex={'flex'}>
            <Sidebar/>
            <div className={styles.content}>
                <PostList allUsersPosts posts={posts} title={'Последние обновления пользователей'} profile={user} user={user}/>
            </div>
        </Container>
    );
};

export default Posts;