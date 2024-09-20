import { Module } from '@nestjs/common';
import { cronModule } from './cron/cron.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ cronModule, ScheduleModule.forRoot()],
  

})
export class AppModule {}
