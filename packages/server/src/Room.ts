import {Server, Socket} from "socket.io";
import {ChatMessage, JoinedProps, User} from "common";


class Room {
    roomId: string
    io: Server;
    messages: Array<ChatMessage> = []
    users: Map<string, User> = new Map()
    isOpen: boolean = true

    constructor(io: Server, username: string, avatar: string, userSocket: Socket, roomId: string) {
        console.debug(`[${roomId}] ${avatar} ${username} creating room`)
        this.roomId = roomId
        this.io = io
        this.users.set(userSocket.id, {username, avatar})
        userSocket.join(roomId)
        this.setupListeners(userSocket)
    }

    joinRoom(username: string, avatar: string, socket: Socket) {
        console.debug(`[${this.roomId}] ${avatar} ${username} joining`)
        this.users.set(socket.id, {username, avatar})
        socket.join(this.roomId)
        socket.emit('joined', {
            messages: this.messages,
            users: Array.from(this.users.values()).map((user) => {
                return {
                    username: user.username,
                    avatar: user.avatar
                }
            })
        } as JoinedProps)
        this.setupListeners(socket)
    }

    setupListeners(socket: Socket) {
        socket.on('message', (msg: string) => {
            const user = this.users.get(socket.id) as User
            if (!user) return
            console.debug(`[${this.roomId}] ${user?.avatar} ${user.username}: ${msg}`)
            let chatMessage = {
                user,
                socketId: socket.id,
                content: msg,
                timestamp: Date.now()
            };
            this.messages.push(chatMessage)
            this.io.to(this.roomId).emit("message", chatMessage)
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