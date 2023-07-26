import express, {NextFunction, Request, Response} from "express";
import http from "http";
import {Server} from 'socket.io'

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:5173',
        allowedHeaders: ['Access-Control-Allow-Origin:*']
    },
    path: '/chat'
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {    // Default error status and message
    console.error(err);
});

app.get('/', (req: Request, res: Response) => {
    res.send('<h1>👌</h1>');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

httpServer.listen(3000, () => {
    console.log('listening on port 3000');
});