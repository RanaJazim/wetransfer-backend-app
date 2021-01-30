import { Module } from '@nestjs/common';
import { EventRegisterController } from './event-register.controller';
import { EventRegisterService } from './event-register.service';

@Module({
  controllers: [EventRegisterController],
  providers: [EventRegisterService]
})
export class EventRegisterModule {}
