import React, {useEffect} from 'react';
import styles from "../../pages/Users/Users.module.scss";
import {Conversations} from "../../models/Conversations";
import {chatSlice} from "../../store/chat/slice";
import {fetchCreateConversation} from "../../store/chat/actionCreators";
import {Link} from "react-router-dom";
import {SERVER_IMAGES_URL} from "../../constants";
import AvatarPng from "../../assets/avatar.jpg";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {fetchAllUsers, fetchFollow, fetchUnFollow} from "../../store/profile/actionCreator";
import {userSlice} from "../../store/profile/slice";
import {Followings} from "../../models/Profile";
import {User} from "../../models/User";
import Loader from "../UI/Loader/Loader";

type Props = {
    title?: string;
    users: User[];
    inFriends?: boolean;
}


const UsersList = ({title, users, inFriends}: Props) => {

    const dispatch = useAppDispatch();
    const {user} = useAppSelector(state => state.authReducer);
    const {conversations} = useAppSelector(state => state.chatReducer);
    const {isLoading} = useAppSelector(state => state.userReducer);


    const getCurrentUser = (id: string) => {
        const currentUser = users.filter((user) => user._id === id)[0];
        dispatch(userSlice.actions.setCurrentConversation(currentUser))
        localStorage.setItem('currentUser', JSON.stringify(currentUser))
    }

    const follow = (id: string) => {
        const obj: Followings = {
            userId: user!._id,
            id: id,
        }
        dispatch(fetchFollow(obj))
    }
    const unFollow = (id: string) => {
        const obj: Followings = {
            userId: user!._id,
            id: id,
        }
        dispatch(fetchUnFollow(obj))
    }

    console.log(users)
    return (
        <div className={styles.content}>
            <h1>{title}</h1>
            <div className={styles.users}>
                {
                    users.map(({username, country, _id, profilePicture, followers}, index) => {
                        const openConv = () => {
                            if (!user) return;

                            let arrId: string[] = []
                            let currentConv: Conversations

                            const membersId = {
                                senderId: user._id,
                                receiverId: _id
                            }

                            conversations.map((conv) => {
                                conv.members[0] === membersId.senderId && conv.members[1] === membersId.receiverId
                                    ? arrId.push('conversation')
                                    : arrId.push('notConversation')
                            })

                            conversations.some((conv) => {
                                if (conv.members[0] === membersId.senderId && conv.members[1] === membersId.receiverId && conv._id) {
                                    currentConv = conversations.filter((conver) => conver._id === conv._id)[0]
                                    localStorage.setItem('CurrentConversation', JSON.stringify(currentConv))
                                    dispatch(chatSlice.actions.setCurrentConversation(currentConv))
                                }
                            })

                            if (arrId.some((l) => l === "conversation")) {

                            } else {
                                dispatch(fetchCreateConversation(membersId))
                                localStorage.setItem('newConvReceiverId', membersId.receiverId)
                            }

                        }

                        const handleGetCurrentUser = () => {
                            getCurrentUser(_id)
                        }

                        if (!(user && user.username === username)) {
                            return (

                                <div className={styles.user} key={_id}>
                                    <Link to={`/profile/${_id}`} onClick={handleGetCurrentUser}>
                                        <div className={styles.userAvatar}>
                                            <img src=
                                                     {profilePicture !== '' ? `${SERVER_IMAGES_URL}${profilePicture}` : AvatarPng}/>
                                        </div>
                                    </Link>
                                    <div className={styles.userInfoBlock}>
                                        <div className={styles.userInfo}>
                                            <div><p>{username}</p></div>
                                            <div><p>{country}</p></div>
                                        </div>

                                        <div className={styles.blockButtons}>
                                            {isLoading
                                                ? <Loader/>
                                                : <div className={styles.buttons}>
                                                    {inFriends
                                                        ? ''
                                                        : followers && followers.find((value) => value === user!._id)
                                                            ? <button
                                                                onClick={() => unFollow(_id)}>Отписаться</button>
                                                            : <button
                                                                onClick={() => follow(_id)}>Подписаться</button>}

                                                </div>
                                            }

                                            <Link to={'/'} onClick={openConv}>Написать сообщение</Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    })}
            </div>
        </div>
    );
};

export default UsersList;