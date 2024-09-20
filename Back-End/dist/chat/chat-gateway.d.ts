import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private messages;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleNewMessage(message: {
        userId: string;
        message: string;
    }): void;
}
