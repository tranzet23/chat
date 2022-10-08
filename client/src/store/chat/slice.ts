import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Conversations} from "../../models/Conversations";
import { Message} from "../../models/Message";
import {ConversationUser} from "../../models/ConversationUser";


export interface ChatState {
    conversations: Conversations[],
    messages: Message[],
    currentConversation: Conversations | null,
    arrivalMessage: Message | null,

    conversationsUsers: ConversationUser[]
}

const initialState: ChatState = {
    conversations: [],
    messages: [],
    currentConversation: null,
    arrivalMessage: null,

    conversationsUsers: []
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setConversations: (state, {payload}: PayloadAction<Conversations[]>) => {
            state.conversations = payload
        },
        setCurrentConversation: (state, {payload}: PayloadAction<Conversations>) => {
            state.currentConversation = payload
        },
        setMessages: (state, {payload}: PayloadAction<Message[]>) => {
            state.messages = payload
        },
        addMessage: (state, {payload}: PayloadAction<Message>) => {
            state.messages.push(payload)
        },
        setArrivalMessage: (state, {payload}: PayloadAction<Message>) => {
            state.arrivalMessage = payload
        },
        setConversationsUsers: (state, {payload}: PayloadAction<ConversationUser[]>) => {
            state.conversationsUsers = payload
        }
    }
})

export const authKey = chatSlice.name;

export default chatSlice.reducer;