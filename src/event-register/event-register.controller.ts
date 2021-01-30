import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';

import { EventRegisterDto, EventRegisterFormDto } from './dtos';
import { EventRegisterService } from './event-register.service';

@Controller('event-register')
export class EventRegisterController {
  constructor(private eventRegService: EventRegisterService) {}

  @Get()
  async allEventsRegister() {
    return 'All event registers';
  }

  @Post()
  async createEventRegister(
    @Body(ValidationPipe) regEvent: EventRegisterFormDto,
  ): Promise<EventRegisterDto> {
    return this.eventRegService.createRegistrationForEvent(regEvent);
  }
}
