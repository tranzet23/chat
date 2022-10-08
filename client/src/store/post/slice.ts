import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPost} from "../../models/Post";
import {fetchAllPosts, fetchPosts, fetchUpdatePost, fetchUsersPosts} from "./actionCreators";


interface AuthState {
    post: IPost | null,
    posts: IPost[]
    postsUsers: IPost[]
    isLoading: boolean,
    error: string | null,
}

const initialState: AuthState = {
    post: {} as IPost,
    isLoading: false,
    posts: [] as IPost[],
    postsUsers: [] as IPost[],
    error: null,
}



export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {

        createPost: (state, {payload}: PayloadAction<IPost>) => {
            state.post = payload;
            state.isLoading = false;
        },
        deletePost: (state, {payload}: PayloadAction<IPost>) => {
            state.post = payload;
            state.isLoading = false;
        },
    },
    extraReducers: (builder) => {

        builder.addCase(fetchAllPosts.fulfilled, (state, {payload}: PayloadAction<IPost[]>) => {
            state.isLoading = false;
            state.error = null;
            state.posts = payload
        });
        builder.addCase(fetchAllPosts.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchAllPosts.rejected, (state, action) => {
            state.isLoading = false;
            if (action.payload === undefined) {
                state.error = 'Произошла ошибка';
            } else {
                state.error = 'Ошибка';
            }
        });


        builder.addCase(fetchPosts.fulfilled, (state, {payload}: PayloadAction<IPost[]>) => {
            state.isLoading = false;
            state.error = null;
            state.posts = payload
        });
        builder.addCase(fetchPosts.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.isLoading = false;
            if (action.payload === undefined) {
                state.error = 'Произошла ошибка';
            } else {
                state.error = 'Ошибка';
            }
        });

        builder.addCase(fetchUpdatePost.fulfilled, (state, {payload}: PayloadAction<IPost>) => {
            state.isLoading = false;
            state.error = null;
            state.post = payload
        });
        builder.addCase(fetchUpdatePost.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchUpdatePost.rejected, (state, action) => {
            state.isLoading = false;
            if (action.payload === undefined) {
                state.error = 'Произошла ошибка';
            } else {
                state.error = 'Ошибка';
            }
        });

        builder.addCase(fetchUsersPosts.fulfilled, (state, {payload}: PayloadAction<IPost[]>) => {
            state.isLoading = false;
            state.error = null;
            state.postsUsers = payload
        });
        builder.addCase(fetchUsersPosts.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchUsersPosts.rejected, (state, action) => {
            state.isLoading = false;
            if (action.payload === undefined) {
                state.error = 'Произошла ошибка';
            } else {
                state.error = 'Ошибка';
            }
        });
    }
});




export const postKey = postSlice.name;

export default postSlice.reducer;