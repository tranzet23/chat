import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {fetchAllUsers, fetchFriends} from "../../store/profile/actionCreator";
import Container from "../../components/Container/Container";
import Sidebar from "../../components/Sidebar/Sidebar";
import UsersList from "../../components/UsersList/UsersList";
import Loader from "../../components/UI/Loader/Loader";



const Friends = () => {
    const dispatch = useAppDispatch()
    const {user} = useAppSelector(state => state.authReducer)
    const {users, isLoading} = useAppSelector(state => state.userReducer)

    useEffect(() => {
        dispatch(fetchFriends(user!._id))
    }, [dispatch])

    return (
        <Container flex={'flex'}>
            <Sidebar/>
            {isLoading ? <Loader/> :  <UsersList users={users} title={'Друзья'} inFriends/> }

        </Container>
    );
};

export default Friends;