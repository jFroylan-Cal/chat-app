import express, { Router } from 'express';
import { Server as SocketServer } from 'socket.io';
import { setUpSocket } from '../sockets/chat.socket';
import { createServer } from 'http';
import  cors  from 'cors';	


interface Options {
    port: number;
    routes: Router;

}

export class Server {
    public readonly app = express();
    private serverListener: any;
    private readonly port: number;
    private readonly routes: Router;


    constructor(options: Options) {
        const { port, routes } = options;
        this.port = port;
        this.routes = routes;
    }

    async start() {   

        const httpServer = createServer(this.app);

        //* Socket.io
        const io = new SocketServer(httpServer, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"],
                credentials: true,
            },
        })
        setUpSocket(io);
        this.app.use(cors({
            origin: "*",
            methods: ["GET", "POST"],
            credentials: true,
        }));
        //* Middleware
        this.app.use(express.json());
        //* Routes
        this.app.use(this.routes);
        
        this.serverListener = httpServer.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        }); 

    }

    public close() {
        this.serverListener?.close();
    }
}

