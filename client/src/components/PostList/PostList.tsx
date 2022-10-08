import React from 'react';
import styles from './PostList.module.scss'
import PostItem from "../Post/Post";
import {IPost} from "../../models/Post";
import {User} from "../../models/User";
import {fetchDeletePost, fetchPosts} from "../../store/post/actionCreators";
import {useAppDispatch} from "../../hooks/redux";

type Props = {
    posts: IPost[];
    title: string;
    profile: User | null;
    user: User | null;
    allUsersPosts?: boolean
}

const PostList = ({posts, title, profile, user, allUsersPosts}:Props) => {
    const dispatch = useAppDispatch()

    if(!posts.length) {
        return (
            <h1>Постов не найдено</h1>
            )
    }

    const removePost = (post: IPost) => {
        if (user) {
            if (user._id === post.userId) {
                if (posts.filter(p => p._id !== post._id)) {
                    dispatch(fetchDeletePost(post._id, post.userId))
                }
            }
        }
        const objToFetchPosts = {
            userId: profile!._id,
            username: profile!.username,
        }
        dispatch(fetchPosts(objToFetchPosts))
    }


    return (
        <div className={styles.posts}>
            <h1 className={styles.postsTitle}>{title}</h1>
            {posts.map((post,index) =>
                <PostItem profile={profile} user={user} allUsersPosts={!!allUsersPosts} remove={removePost} number={index + 1} key={post._id}
                          post={post}/>
            )}
        </div>
    );
};

export default PostList;