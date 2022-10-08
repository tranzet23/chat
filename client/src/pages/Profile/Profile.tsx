import React, {useEffect} from 'react';
import styles from './Profile.module.scss'
import ProfileBlock from "../../components/ProfileBlock/ProfileBlock";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {fetchUserProfile} from "../../store/profile/actionCreator";
import {useParams} from "react-router-dom";
import Loader from "../../components/UI/Loader/Loader";
import Container from "../../components/Container/Container";


const Profile = () => {
    const dispatch = useAppDispatch();
    const {_id} = useParams();
    const {userProfile, error, isLoading} = useAppSelector(state => state.userReducer)


    useEffect(() => {
        if (_id) {
            dispatch(fetchUserProfile(_id))
        }
    }, [dispatch, _id]);

    if (error) {
        return <h1>{error}</h1>
    }

    if (isLoading) {
        return <div className={'center'}>
            <Loader/>
        </div>
    }


    return (
        <Container flex={'flex'}>
            {userProfile && <ProfileBlock profile={userProfile}/>}
        </Container>
    );
};

export default Profile;