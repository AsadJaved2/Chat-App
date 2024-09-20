import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway(3005, { 
  cors: { 
    origin: '*',
  } 
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private messages: { userId: string; message: string; timestamp: Date }[] = [];

  handleConnection(client: Socket) {
    if (client && client.id) {
      
      this.server.emit('user-joined', {
        message: `User Joined The Chat: ${client.id}`,
      });
    } else {
      console.error('Client or client.id is undefined during connection');
    }
  }

  handleDisconnect(client: Socket) {

    this.server.emit('user-left', {
      message: `User Left The Chat: ${client.id}`,
    });
  }

  @SubscribeMessage('newMessage')
  handleNewMessage(@MessageBody() message: { userId: string; message: string }) {
    if (message && message.userId) {
      const newMessage = {
        userId: message.userId, 
        message: message.message, 
        timestamp: new Date(),
      };
      this.messages.push(newMessage);
      this.server.emit('message', newMessage); 
    } else {
      console.error('Message or userId is undefined');
    }
  }
}