import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { User} from "../../models/User";


interface AuthState {
    user: User | null,
    isFetching: boolean,
    error: string | null
}

const initialState: AuthState = {
    user: JSON.parse(localStorage.getItem("user") || "null") || null,
    isFetching: false,
    error: null
}



export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        fetchRegister: (state) => {
            state.user = null;
            state.isFetching = true;
            state.error = null
        },
        registerSuccess: (state, { payload }: PayloadAction<User>, ) => {
            state.user = payload;
            state.error = null;
            state.isFetching = false;
        },
        registerError: (state, { payload }: PayloadAction<string>, ) => {
            state.user = null;
            state.isFetching = false;
            state.error = payload
        },
        fetchLogin: (state) => {
            state.user = null;
            state.isFetching = true;
            state.error = null
        },
        loginSuccess: (state, { payload }: PayloadAction<User>, ) => {
            state.user = payload;
            state.error = null;
            state.isFetching = false;
        },
        loginError: (state, { payload }: PayloadAction<string>, ) => {
            state.user = null;
            state.isFetching = false;
            state.error = payload
        },
        fetchLogout: (state) => {
            state.user = null;
            state.isFetching = false;
            state.error = null
        },
        profileLogout: (state) => {
            state.user = null;
            state.isFetching = false;
            state.error = null
        },
        replaceAuthUser: (state, { payload }: PayloadAction<User>) => {
            const user = { ...state.user, ...payload }
            localStorage.setItem("user", JSON.stringify(user));
            state.user = user;
        }
    }
});




export const authKey = authSlice.name;

export default authSlice.reducer;