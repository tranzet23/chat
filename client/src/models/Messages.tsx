import {User} from "./User";

export type Messages = {
    _id: string,
    conversationId: string,
    sender: string,
    text: string | number,
    createdAt: string
}

export type FetchMessage = Pick<Messages, 'text' | 'sender' | 'conversationId'>