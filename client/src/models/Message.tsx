export type Message = {
    _id: string,
    conversationId: string,
    sender: string,
    text: string | number,
    createdAt: string
}

export type FetchMessage = Pick<Message, 'text' | 'sender' | 'conversationId'>