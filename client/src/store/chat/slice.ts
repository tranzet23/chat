import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Conversations} from "../../models/Conversations";
import {Messages} from "../../models/Messages";


export interface ChatState {
    conversations: Conversations[],
    messages: Messages[]
}

const initialState: ChatState = {
    conversations: [],
    messages: []
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setConversations: (state, {payload}: PayloadAction<Conversations[]>) => {
            state.conversations = payload
        },
        setMessages: (state, {payload}: PayloadAction<Messages[]>) => {
            state.messages = payload
        }
    }
})

export const authKey = chatSlice.name;

export default chatSlice.reducer;