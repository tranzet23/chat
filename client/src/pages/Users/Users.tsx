import React, {useEffect, useState} from 'react';
import Container from "../../components/Container/Container";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {fetchAllUsers, fetchFollow, fetchUnFollow} from "../../store/profile/actionCreator";
import {User} from "../../models/User";
import Sidebar from "../../components/Sidebar/Sidebar";
import UsersList from "../../components/UsersList/UsersList";
import Loader from "../../components/UI/Loader/Loader";


type Props = {
    users: User[]

}


const Users = ({users}: Props) => {
    const dispatch = useAppDispatch();
    const {isLoading} = useAppSelector(state => state.userReducer)

    useEffect(() => {
        dispatch(fetchAllUsers())
    }, [dispatch])

    return (
        <Container flex={'flex'}>
            <Sidebar/>
            {isLoading ? <Loader/> :   <UsersList users={users} title={'Все пользователи'}/> }


        </Container>
    );
};

export default Users;
