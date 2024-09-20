import { Module } from '@nestjs/common';
import { ChatGateway } from '../chat/chat-gateway';
import { MessageArchiveService } from '../cron/cron.service';

@Module({
  providers: [ChatGateway, MessageArchiveService],
})
export class cronModule {}
