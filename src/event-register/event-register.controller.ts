import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';

import { EventRegisterDto, EventRegisterFormDto } from './dtos';
import { EventRegisterService } from './event-register.service';

@Controller('event-register')
export class EventRegisterController {
  constructor(private eventRegService: EventRegisterService) {}

  @Get(':id')
  async allEventsRegister(
    @Param('id') id: number,
  ): Promise<EventRegisterDto[]> {
    return this.eventRegService.getRegisteredEvents(id);
  }

  @Post()
  async createEventRegister(
    @Body(ValidationPipe) regEvent: EventRegisterFormDto,
  ): Promise<EventRegisterDto> {
    return this.eventRegService.createRegistrationForEvent(regEvent);
  }
}
