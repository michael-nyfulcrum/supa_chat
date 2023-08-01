import {Server, Socket} from "socket.io";
import {ChatMessage, JoinedProps, User} from "common";


class Room {
    roomId: string
    io: Server;
    messages: Array<ChatMessage> = []
    users: Map<string, User> = new Map()
    isOpen: boolean = true

    constructor(io: Server, user: User, userSocket: Socket, roomId: string) {
        console.debug(`[${roomId}] ${user.avatar} ${user.username} creating room`)
        this.roomId = roomId
        this.io = io
        this.users.set(userSocket.id, user)
        userSocket.join(roomId)
        this.setupListeners(userSocket)
    }

    joinRoom(user: User, socket: Socket) {
        console.debug(`[${this.roomId}] ${user.avatar} ${user.username} joining`)
        this.users.set(socket.id, user)
        socket.join(this.roomId)
        socket.emit('joined', {
            messages: this.messages,
            users: Array.from(this.users.values())
        } as JoinedProps)
        socket.to(this.roomId).emit("userJoined", user)
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

        socket.on('leave', () => {
            this.removeUser(socket);

        });

        socket.on('disconnect', () => {
            this.removeUser(socket);
        });

    }

    private removeUser(socket: Socket) {
        const user = this.users.get(socket.id) as User
        if (user) {
            this.io.to(this.roomId).emit("userLeft", user.uuid)
            this.users.delete(socket.id)
        }
        if (this.users.size == 0) {
            this.isOpen = false
        }
    }
}

export default Room