import {AppDispatch} from "../index";
import {authSlice} from "./slice";
import {api} from "../../api";
import {User} from "../../models/User";
import {LoginUser} from "../../models/User";
import {toast} from "react-toastify";






export const fetchRegister = (user: User) => async (dispatch: AppDispatch) => {
    try {
        dispatch(authSlice.actions.fetchRegister());
        const response = await api.post<User>('/auth/register', user);
        dispatch(authSlice.actions.registerSuccess(response.data));
        localStorage.setItem("user", JSON.stringify(response.data))
        toast('🦄 Registration successful!', {
            autoClose: 5000,
        })

     } catch (e) {
        // @ts-ignore
        dispatch(authSlice.actions.registerError(e.message));
        toast('🦄 Ошибка в регистрации!', {
            autoClose: 5000,
            type: 'error'
        })
    }
}

export const fetchLogin = (user: LoginUser) => async (dispatch: AppDispatch) => {
    try {
        dispatch(authSlice.actions.fetchLogin());
        const response = await api.post<User>('/auth/login', user);
        dispatch(authSlice.actions.loginSuccess(response.data));
        localStorage.setItem("user", JSON.stringify(response.data))
        toast('🦄 Вы успешно вошли!', {
            autoClose: 5000,
        })

    } catch (e) {
        // @ts-ignore
        dispatch(authLoginSlice.actions.loginError(e.message));
        toast('🦄 Не верные данные!', {
            autoClose: 5000,
            type: 'error'
        })
    }
}

export const fetchLogout = (user: User) => async (dispatch: AppDispatch) => {
    try {
        dispatch(authSlice.actions.fetchLogout());
        const response = await api.post<User>('/auth/login', user);
        dispatch(authSlice.actions.profileLogout());
        localStorage.removeItem("user")
        toast('🦄 Вы вышли из аккаунта!', {
            autoClose: 5000,
        })

    } catch (e) {

    }
}

// fetchConversations(userId: string)