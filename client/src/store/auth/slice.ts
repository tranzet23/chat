import {createSlice} from "@reduxjs/toolkit";

interface AuthState {
    user: string | null,
    isFetching: boolean,
    error: string | null
}

const initialState: AuthState = {
    user: null,
    isFetching: false,
    error: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.user = null;
            state.isFetching = true;
            state.error = null
        }
    }
});

export const authKey = authSlice.name;

export default authSlice.reducer;