import { Request, Response } from "express";
import { MessagesService } from "../services/messages.service";


const messagesService = new MessagesService();

export const createMessage = async (request: Request, response: Response) => {
    const { content, sender } = request.body;
    const message = await messagesService.createMessage(content, sender);
    response.status(200).json(message);
}

export const getMessages = async (request: Request, response: Response) => {
    const messages = await messagesService.getMessages();
    response.status(200).json(messages);
}