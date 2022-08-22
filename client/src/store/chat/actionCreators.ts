import {AppDispatch} from "../index";
import {Conversations} from "../../models/Conversations";
import {api} from "../../api";
import {chatSlice, ChatState} from "./slice";
import {FetchMessage, Messages} from "../../models/Messages";






export const fetchConversations = (userId: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await api.get<Conversations[]>('/conversations/' + userId);
        dispatch(chatSlice.actions.setConversations(response.data));
    } catch (e) {
        console.error(e);
    }
}

export const fetchMessages = (convId: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await api.get<Messages[]>('/messages/' + convId);
        dispatch(chatSlice.actions.setMessages(response.data));
    } catch (e) {
        console.error(e);
    }
}

export const fetchAddMessage = (message: FetchMessage) => async (dispatch: AppDispatch) => {
    try {
        const response = await api.post<Messages[]>('/messages/', message);
        dispatch(chatSlice.actions.addMessages(response.data));
    } catch (e) {
        console.error(e);
    }
}