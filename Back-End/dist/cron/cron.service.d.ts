import { ChatGateway } from '../chat/chat-gateway';
export declare class MessageArchiveService {
    private readonly chatGateway;
    constructor(chatGateway: ChatGateway);
    handleCron(): void;
    private archiveMessages;
}
