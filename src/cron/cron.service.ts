import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ChatGateway } from '../chat/chat-gateway'; 
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MessageArchiveService {
  constructor(private readonly chatGateway: ChatGateway) {}

  @Cron('0 */2 * * *') 
  handleCron() {
    this.archiveMessages();
  }

  private archiveMessages() {
    const messages = this.chatGateway['messages']; 
    const filePath = path.join(__dirname, 'messages.txt');

    const messageStrings = messages.map(msg => {
      return `[${msg.timestamp.toISOString()}] ${msg.userId}: ${msg.message}`;
    });

    fs.appendFileSync(filePath, messageStrings.join('\n') + '\n', 'utf8');

   
    this.chatGateway['messages'] = []; 
  }
}
