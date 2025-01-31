import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class MessagesService { 
    async getMessages(): Promise<any> { 
        const messages = await prisma.message.findMany();
        if (!messages) {
            throw new Error("No messages found");
        }
        return messages;
    }

    async createMessage(content: string, sender: string) { 
        if (!content || !sender) {
            throw new Error("MIssing data for create message");
        }
        if (content=== '') {	
            throw new Error("Content cannot be empty");
        }
        if (sender === '') {
            throw new Error("Sender cannot be empty");
        }

        return await prisma.message.create({
            data: {
                content,
                sender,
            },
        });
    }
}