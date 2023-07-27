import express, {NextFunction, Request, Response} from "express";
import http from "http";
import {Server} from 'socket.io'
import {JoinRoomProps} from "lib";
import Room from "./Room";

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:5173',
        allowedHeaders: ['Access-Control-Allow-Origin:*']
    },
    path: '/chat'
});
const rooms = new Map<string, Room>()

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {    // Default error status and message
    console.error(err);
});

app.get('/', (req: Request, res: Response) => {
    res.send('<h1>👌</h1>');
});

io.on('connection', (socket) => {
     socket.on('join', (props: JoinRoomProps) => {
        const {roomId, username} = props
        const room = rooms.get(roomId);
        const user = {socket, username};
        if (room && room.isOpen) {
            room.joinRoom(user)
        } else {
            rooms.set(props.roomId, new Room(io, user, roomId))
        }
    });
});

httpServer.listen(3000, () => {
    console.log('listening on port 3000');
});