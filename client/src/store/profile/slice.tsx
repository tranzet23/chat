import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {User} from "../../models/User";
import { fetchFriends, fetchUpdateProfile} from "./actionCreator";


export interface ProfileState {
    users: User[],
    userProfile: User | null,
    isEditMode: boolean,
    isLoading: boolean,
    error: string | null,
}

const initialState: ProfileState = {
    users: [],
    userProfile: {} as User,
    isEditMode: false,
    isLoading: false,
    error: null,
}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, {payload}: PayloadAction<User[]>) => {
            state.users = payload
        },
        setCurrentConversation: (state, {payload}: PayloadAction<User>) => {
            state.userProfile = payload
        },
        fetchUserProfile: (state) => {
            state.isLoading = true;
            state.userProfile = null;
        },
        setUserProfile: (state, {payload}: PayloadAction<User>) => {
            state.isLoading = false
            state.userProfile = payload
        },
        setUserProfileError: (state, {payload}: PayloadAction<string>) => {
            state.isLoading = false;
            state.userProfile = null;
            state.error = payload;
        },
        isEditMode: (state) => {
            state.isEditMode = true
        },
        follow: (state, {payload}: PayloadAction<User>) => {
            state.userProfile = payload;
        },
        unfollow: (state, {payload}: PayloadAction<User>) => {
            state.userProfile = payload;
        },
    },
    extraReducers: (builder) => {

        builder.addCase(fetchUpdateProfile.fulfilled, (state, {payload}: PayloadAction<User>) => {
            state.userProfile = payload
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(fetchUpdateProfile.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchUpdateProfile.rejected, (state, action) => {
            state.isLoading = false;
            if (action.payload === undefined) {
                state.error = 'Произошла ошибка';
            } else {
                state.error = 'Ошибка';
            }
        });

        builder.addCase(fetchFriends.fulfilled, (state, {payload}: PayloadAction<User[]>) => {
            state.users = payload
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(fetchFriends.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchFriends.rejected, (state, action) => {
            state.isLoading = false;
            if (action.payload === undefined) {
                state.error = 'Произошла ошибка';
            } else {
                state.error = 'Ошибка';
            }
        });
    }

})


export const authKey = userSlice.name;

export default userSlice.reducer;