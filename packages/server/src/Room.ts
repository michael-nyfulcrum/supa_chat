import {Server, Socket} from "socket.io";
import {ChatMessage, JoinedProps} from "common";

export type User = { socket: Socket, username: string };


class Room {
    id: string
    io: Server;
    messages: Array<ChatMessage> = []
    users: Map<string, User> = new Map()
    isOpen: boolean = true

    constructor(io: Server, user: User, id: string) {
        console.debug(`[${id}] ${user.username} creating room`)
        this.id = id
        this.io = io
        this.users.set(user.socket.id, user)
        user.socket.join(id)
        this.setupListeners(user.socket)
    }

    joinRoom(user: User) {
        console.debug(`[${this.id}] ${user.username} joining`)
        this.users.set(user.socket.id, user)
        user.socket.join(this.id)
        user.socket.emit('joined', {
            messages: this.messages,
            users: Array.from(this.users.values()).map((user) => user.username)
        } as JoinedProps)
        this.setupListeners(user.socket)
    }

    setupListeners(socket: Socket) {
        socket.on('message', (msg: ChatMessage) => {
            console.debug(`[${this.id}] ${msg.username}: ${msg.content}`)
            this.messages.push(msg)
            this.io.to(this.id).emit("message", msg)
        });

        socket.on('disconnect', () => {
            this.users.delete(socket.id)
            if (this.users.size == 0) {
                this.isOpen = false
            }
        });

    }
}

export default Room


const dummyMessages = [
    {
        id: "1",
        username: "John",
        socketId: "John",
        content: "Hey there!",
        timestamp: 1679938800,
    },
    {
        id: "2",
        username: "Alice",
        socketId: "Alice",
        content: "Hi John! How are you?",
        timestamp: 1679939100,
    },
    {
        id: "3",
        username: "John",
        socketId: "John",
        content: "I'm doing great, thanks!",
        timestamp: 1679939400,
    },
    {
        id: "4",
        username: "Alice",
        socketId: "Alice",
        content: "That's good to hear!",
        timestamp: 1679939700,
    },
    {
        id: "5",
        username: "John",
        socketId: "John",
        content: "How about you?",
        timestamp: 1679940000,
    },
    {
        id: "6",
        username: "Alice",
        socketId: "Alice",
        content: "I'm doing well too, thanks!",
        timestamp: 1679940300,
    },
];
