import {AppDispatch} from "../index";
import {Conversations} from "../../models/Conversations";
import {api} from "../../api";
import {chatSlice, ChatState} from "./slice";
import {FetchMessage, Message} from "../../models/Message";
import {Socket} from "socket.io-client";
import {ConversationUser} from "../../models/ConversationUser";
import {User} from "../../models/User";







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
        const response = await api.get<Message[]>('/messages/' + convId);
        dispatch(chatSlice.actions.setMessages(response.data));
    } catch (e) {
        console.error(e);
    }
}

export const fetchAddMessage = (message: FetchMessage, socket: Socket, conv: Conversations) => async (dispatch: AppDispatch) => {
    try {
        const response = await api.post<Message>('/messages/', message);

        const receiverId = conv.members.find((member) => member !== message.sender)

        socket?.emit("sendMessage", {
            id: response.data._id,
            conversationId: response.data.conversationId,
            senderId: message.sender,
            text: message.text,
            receiverId,
            createdAt: response.data.createdAt
        })

        dispatch(chatSlice.actions.addMessage(response.data))
    } catch (e) {
        console.error(e);
    }
}


export const fetchUsersByConversations = (conversations: Conversations[], currentUser: User) => async (dispatch: AppDispatch) => {
    let promises = [];
    for (let i = 0; i < conversations?.length; i++) {
        const receiverId = conversations[i]?.members.filter((member) => member !== currentUser?._id)[0]
        promises.push(
            api.get<User>('/users?userId=' + receiverId).then(response => {
                return ({conversationId: conversations[i]._id, user: response.data} as ConversationUser);
            })
        );
    }
    Promise.all(promises).then(response => {
        dispatch(chatSlice.actions.setConversationsUsers(response))
    });
}

export const fetchCreateConversation = (members: any) => async (dispatch: AppDispatch) => {
    try {
        const response = await api.post<Conversations[]>('/conversations/', members);
        return response;
    } catch (e) {
        console.error(e);
    }
}

// senderId: string, receiverId: string