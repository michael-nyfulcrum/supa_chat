import express, {NextFunction, Request, Response} from "express";
import http from "http";
import {Server} from 'socket.io'
import {JoinRoomProps} from "../../common";
import Room from "./Room";
import dotenv from 'dotenv'

dotenv.config()
const CLIENT_URL = process.env.CLIENT_URL;
if (!CLIENT_URL) throw "Missing ENV"

const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: CLIENT_URL,
        allowedHeaders: [`Access-Control-Allow-Origin:${CLIENT_URL}`]
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