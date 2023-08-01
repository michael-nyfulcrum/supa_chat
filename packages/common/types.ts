export interface ChatMessage {
    user: User
    content: string
    timestamp: number
}

export interface JoinRoomProps {
    roomId: string,
    user: User
} 

export interface User {
    uuid: string,
    socketId: string,
    username: string,
    avatar: string,
}

export interface JoinedProps {
    messages: Array<ChatMessage>;
    users: User[];
}
