import { Server } from "socket.io";
import { MessagesService } from "../services/messages.service";


const messagesService = new MessagesService();

export const setUpSocket = (io: Server) => { 
    io.on("connection", (socket) => {
        console.log("A user connected");

        socket.on("message",  async (data: { sender: string, content: string }) => {
            const { sender, content } = data;
            try {
                await messagesService.createMessage(content, sender);
                io.emit("newMessage", { sender, content });
                console.log(`A user sent a message: ${content}`);
            } catch (error) {
                console.error("Error creating message:", error);
                socket.emit("messageError", { message: "Failed to send message" });
            }
        });


        socket.on("disconnect", () => {
            console.log("A user disconnected");
        });
    });
}