import express, { Router } from 'express';
import { AppDataSource } from './config/database/database';
import * as io from 'socket.io';


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
        //* Database
        const socket = new io.Server(this.serverListener);
        socket.on("connection", (socket) => {
            console.log("a user connected");
        });

        



        //* Middleware
        this.app.use(express.json());
        //* Routes
        this.app.use(this.routes);
        
        this.serverListener = this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        }); 

    }

    public close() {
        this.serverListener?.close();
    }
}

