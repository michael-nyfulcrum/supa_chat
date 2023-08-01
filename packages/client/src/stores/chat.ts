import {defineStore} from 'pinia'
import {computed, ref} from "vue";
import {io} from "socket.io-client";
import {type ChatMessage, type JoinedProps, type JoinRoomProps, type User} from "common";

// Open issue regarding inferred types
// https://github.com/microsoft/TypeScript/issues/47663
export const useChatStore = defineStore('socket', () => {
    const url = import.meta.env.VITE_SERVER_URL;
    const socket = ref(io(url, {autoConnect: false, path: '/chat'}));
    const connected = computed(() => socket.value.connected)

    const messages = ref([] as Array<ChatMessage>)
    const users = ref([] as Array<User>)

    function connect() {
        if (socket.value.disconnected) socket.value.connect()
    }

    function disconnect() {
        socket.value.disconnect()
    }

    function sendMessage(msg: string) {
        socket.value.emit('message', msg)
    }

    function join(username: string, avatar: string, uuid: string, roomId: string) {
        messages.value = []
        const user: User = {
            avatar,
            uuid,
            username,
            socketId: socket.value.id
        }
        users.value = [user]
        socket.value.emit('join', {user, roomId} as JoinRoomProps)
    }

    function leave() {
        socket.value.emit('leave')
    }

    socket.value.on("connect", () => {
    });

    socket.value.on("message", (msg: ChatMessage) => {
        messages.value.push(msg)
    });

    socket.value.on("joined", (props: JoinedProps) => {
        messages.value = props.messages
        users.value = props.users
    });

    socket.value.on("userJoined", (user: User) => {
        console.log('userJoined', user)
        users.value.push(user)
    });

    socket.value.on("userLeft", (uuid: string) => {
        users.value = users.value.filter(user => user.uuid != uuid)
    });

    socket.value.on("disconnect", () => {
    });

    return {
        socket,
        connected,
        connect,
        disconnect,
        sendMessage,
        join,
        leave,
        messages,
        users
    }
})
