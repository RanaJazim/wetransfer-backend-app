import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EventRepository } from 'src/event/event.repository';
import { EventRegisterController } from './event-register.controller';
import { EventRegisterRepository } from './event-register.repository';
import { EventRegisterService } from './event-register.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventRegisterRepository, EventRepository]),
  ],
  controllers: [EventRegisterController],
  providers: [EventRegisterService],
})
export class EventRegisterModule {}
