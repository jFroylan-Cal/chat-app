import { Router } from "express";
import { MessagesRoutes } from "./controller/routes";

export class AppRoutes {
    static get routes(): Router { 
        const router = Router();
        router.use('/api/', MessagesRoutes.routes );
        return router;
    }

}