export interface ChatMessage {
    user: User
    socketId: string
    content: string
    timestamp: number
} 


export interface JoinRoomProps {
    roomId: string,
    username: string,
    avatar: string
} 

export interface User {
    username: string,
    avatar: string,
}

export interface JoinedProps {
    messages: Array<ChatMessage>;
    users: User[];
}
