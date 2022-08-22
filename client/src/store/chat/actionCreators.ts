import {AppDispatch} from "../index";
import {Conversations} from "../../models/Conversations";
import {api} from "../../api";
import {chatSlice, ChatState} from "./slice";
import {Messages} from "../../models/Messages";
import {useContext} from "react";





export const fetchConversations = (userId: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await api.get<Conversations[]>('/conversations/' + userId);
        dispatch(chatSlice.actions.setConversations(response.data));
    } catch (e) {
        console.error(e);
    }
}

// нужно сделать запрос на /messages/"convId"
// получить список текущих сообщений для выбранного чата.
// сохранить список сообщений в redux
export const fetchMessages = (convId: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await api.get<Messages[]>('/messages/' + convId);
        dispatch(chatSlice.actions.setMessages(response.data));
    } catch (e) {
        console.error(e);
    }
}