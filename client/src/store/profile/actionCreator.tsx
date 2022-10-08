import {AppDispatch} from "../index";
import {api} from "../../api";
import {Followings} from "../../models/Profile";
import {userSlice} from "./slice";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {User, UserForUpdate} from "../../models/User";
import {authSlice} from "../auth/slice";



export const fetchAllUsers = () => async (dispatch: AppDispatch) => {
    try {
        const response = await api.get<User[]>('/users/all');
        dispatch(userSlice.actions.setUser(response.data));
    } catch (e) {
        console.error(e);
    }
}

export const fetchUserProfile = (userId: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.fetchUserProfile())
        const response = await api.get<User>(`/users?userId=${userId}`);
        dispatch(userSlice.actions.setUserProfile(response.data));
    } catch (e) {
        const result = (e as Error).message;
        dispatch(userSlice.actions.setUserProfileError(result));
    }
}

export const fetchUpdateProfile = createAsyncThunk(
    'profile/EditProfile',
    async (data: {user: UserForUpdate, isMyProfile: boolean}, {rejectWithValue, dispatch} ) => {
        try {
            await api.put(`/users/${data.user.userForUpdateId}`, data.user);
            const newUserResponse = await api.get<User>(`/users?userId=${data.user.userForUpdateId}`);
            dispatch(userSlice.actions.setUserProfile(newUserResponse.data));

            if (data.isMyProfile) {
                dispatch(authSlice.actions.replaceAuthUser(newUserResponse.data));
            }

            return newUserResponse.data;
        } catch (e) {
            return rejectWithValue('Произошла ошибка')
        }
    }
)


export const fetchFollow = (data: Followings) => async (dispatch: AppDispatch) => {
    try{
        const response = await api.put<User>(`users/${data.id}/follow` , {...data,userId: data.userId})
        dispatch(userSlice.actions.follow(response.data))
        dispatch(fetchAllUsers())
    }
    catch(e) {
        console.log(e)
    }
}

export const fetchUnFollow = (data: Followings) => async (dispatch: AppDispatch) => {
    try{
        const response = await api.put<User>(`users/${data.id}/unfollow` , {...data,userId: data.userId})
        dispatch(userSlice.actions.unfollow(response.data))
        dispatch(fetchAllUsers())
    }
    catch(e) {
        console.log(e)
    }
}

export const fetchFriends = createAsyncThunk(
    'profile/friends',
    async (userId: string , {rejectWithValue, dispatch} ) => {
        try {
            const response = await api.get<User[]>(`/users/friends/${userId}`);
            return response.data;


        } catch (e) {
            return rejectWithValue('Произошла ошибка')
        }
    }
)
