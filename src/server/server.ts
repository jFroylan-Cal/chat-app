import express, { Router } from 'express';
import { Server as SocketServer } from 'socket.io';
import { setUpSocket } from '../sockets/chat.socket';
import { createServer } from 'http';
import  cors  from 'cors';	


interface Options {
    port: number;
    routes: Router;
    socketPort?: number;
}

export class Server {
    public readonly app = express();
    private serverListener: any;
    private serverListenerSocket: any;
    private readonly port: number;
    private readonly socketPort: number;
    private readonly routes: Router;


    constructor(options: Options) {
        const { port, routes, socketPort  } = options;
        this.port = port;
        this.routes = routes;
        this.socketPort = socketPort
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
        
        this.serverListener = this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        }); 
        
        this.serverListenerSocket = httpServer.listen(this.socketPort, () => { 
            console.log(`Socket running on port ${this.socketPort}`);
        });

    }

    public close() {
        this.serverListener?.close();
    }
}

