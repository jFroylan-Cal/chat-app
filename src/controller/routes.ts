import { Router } from "express";
import { createMessage, getMessages } from "./messages.controller";

export class MessagesRoutes { 
    static get routes(): Router { 
        const router = Router();
        router.get("/messages", getMessages);
        router.post("/messages", createMessage);
        return router;
    }

}



