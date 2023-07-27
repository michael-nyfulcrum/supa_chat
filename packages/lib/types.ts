export interface ChatMessage {
    username: string
    socketId: string
    content: string
    timestamp: number
}

export interface JoinRoomProps {
    roomId: string,
    username: string
} 

export interface JoinedProps {
    messages: Array<ChatMessage>;
    users: string[];
}
