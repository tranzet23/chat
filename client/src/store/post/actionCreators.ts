import {AppDispatch} from "../index";
import {api} from "../../api";
import {IPost, PostForUpdate, UsersPost,} from "../../models/Post";
import {postSlice} from "./slice";
import {createAsyncThunk} from "@reduxjs/toolkit";



export const fetchCreatePost = (post: IPost) => async (dispatch: AppDispatch) => {
    try {
        const response = await api.post<IPost>('/posts', post);
        dispatch(postSlice.actions.createPost(response.data))
    } catch (err) {
        console.log(err)
    }
}


export const fetchDeletePost = (postId: string, userId: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await api.delete<IPost>(`/posts/${postId}`, {data: {userId}});
        dispatch(postSlice.actions.deletePost(response.data))
    } catch (err) {
        console.log(err)
    }
}

export const fetchPosts = createAsyncThunk(
    'posts/fetchUserPosts',
    async (data: {userId: string, username: string}, {rejectWithValue}) => {
        try {
            const response = await api.get<IPost[]>(`/posts/profile/${data.username}`, {data});
            return response.data;
        } catch (e) {
            return rejectWithValue('Произошла ошибка. Возможно неверный адрес')
        }
    }
)

export const fetchAllPosts = createAsyncThunk(
    'posts/fetchAllPosts',
    async (_, {rejectWithValue}) => {
        try {
            const response = await api.get<IPost[]>(`/posts/`);
            return response.data;
        } catch (e) {
            return rejectWithValue('Произошла ошибка. Возможно неверный адрес')
        }
    }
)



export const fetchUsersPosts = createAsyncThunk(
    'posts/fetchUsersPosts',
    async (data: {username: string, userId: string}, {rejectWithValue}) => {
        try {
            const response = await api.get<IPost[]>(`/posts/profile/${data.username}`, {data})
            return response.data;
        } catch (e) {
            return rejectWithValue('Произошла ошибка. Возможно неверный адрес')
        }
    }
)


export const fetchUpdatePost =  createAsyncThunk(
    'posts/fetchUpdatePost',
    async (data: PostForUpdate, {rejectWithValue}) => {
        try {
            const response = await api.put<IPost>(`/posts/${data.postId}` ,{...data, userId: data.userId});
            return response.data;
        } catch (e) {
            return rejectWithValue('Произошла ошибка. Возможно неверный адрес')
        }
    }
)



