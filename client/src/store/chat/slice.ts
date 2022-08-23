import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Conversations} from "../../models/Conversations";
import { Messages} from "../../models/Messages";


export interface ChatState {
    conversations: Conversations[],
    messages: Messages[],
    currentConversationId: string

}

const initialState: ChatState = {
    conversations: [],
    messages: [],
    currentConversationId: ''
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setConversations: (state, {payload}: PayloadAction<Conversations[]>) => {
            state.conversations = payload
        },
        setCurrentConversation: (state, {payload}: PayloadAction<string>) => {
            state.currentConversationId = payload
        },
        setMessages: (state, {payload}: PayloadAction<Messages[]>) => {
            state.messages = payload
        },
        addMessages: (state, {payload}: PayloadAction<Messages[]>) => {
            state.messages = payload
        }

    }
})

export const authKey = chatSlice.name;

export default chatSlice.reducer;