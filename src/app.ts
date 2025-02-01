import { envs } from "./config/envs";
import { AppRoutes } from "./routes";
import { Server } from "./server/server";

(async () => { 
    main();
})();


function main() { 
    const server = new Server({
        port: envs.PORT,
        socketPort: envs.SOCKET_PORT,
        routes: AppRoutes.routes,
    });
    server.start();
}


