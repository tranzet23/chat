import React, {useEffect, useMemo, useState} from 'react';
import styles from "../PostList/PostList.module.scss";
import MyButton from "../UI/button/MyButton";
import {IPost} from "../../models/Post";
import classNames from "classnames";
import {User} from "../../models/User";
import EditSvg from "../../assets/edit.svg"
import PostEditForm from "../forms/PostEditForm/PostEditForm";
import Avatar from "../Avatar/Avatar";
import {SERVER_IMAGES_URL} from "../../constants";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import AvatarImg from '../../assets/avatar.jpg';
import {fetchAllUsers} from "../../store/profile/actionCreator";


type Props = {
    remove?: (post: IPost) => void
    number: string | number;
    post: IPost;
    profile: User | null;
    user: User | null;
    allUsersPosts?: boolean
}


const PostItem = ({remove, number, post, profile, user, allUsersPosts}: Props) => {
    const dispatch = useAppDispatch()
    const [editPost, setEditPost] = useState(false)
    const {users} = useAppSelector(state => state.userReducer)
    const classes = classNames(styles.post, {
        [styles.postEdit]: editPost === true
    });


    useEffect(() => {
        dispatch(fetchAllUsers())
    },[dispatch])




    return (
        <div className={classes}>
            <div className={styles.postInfoUser}>
                {users.map(user => user._id === post.userId &&
                        <Avatar key={user._id}
                                image={user.profilePicture !== '' ? `${SERVER_IMAGES_URL}${user!.profilePicture}` : AvatarImg}/>)
                }
                {users.map(user => user._id === post.userId &&
                    <p key={user._id}>{user!.username}</p>)
                }
            </div>
            <PostEditForm editPost={editPost} setEditPost={setEditPost} post={post} number={number}/>

            {allUsersPosts
                ? ''
                : user && user._id === profile!._id && <div className={styles.postBtns}>
                <MyButton
                    noBorder={true}
                    hoverNone={true}
                    onClick={() => setEditPost(true)}>
                    <img src={EditSvg} alt={'editBtn'}/>
                </MyButton>
                <MyButton
                    noBorder={true}
                    className={styles.removeBtn}
                    remove={true} onClick={remove ? () => remove(post) : ''}>
                    X
                </MyButton>
            </div>
            }

        </div>

    );
};

export default PostItem;