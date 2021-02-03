import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';

import {
  EventRegisterDto,
  EventRegisterFormDto,
  EventRegSummary,
} from './dtos';
import { EventRegisterService } from './event-register.service';

@Controller('event-register')
export class EventRegisterController {
  constructor(private eventRegService: EventRegisterService) {}

  @Get('registration')
  async registration(): Promise<string> {
    return this.eventRegService.getRegistrationsForCurrentEvent();
  }

  @Get('summary')
  async registrationSummary() {
    return this.eventRegService.currentEventRegistrationSummary();
  }

  @Get(':id')
  async allEventsRegister(
    @Param('id') id: number,
  ): Promise<EventRegisterDto[]> {
    return this.eventRegService.getRegisteredEvents(id);
  }

  @Post()
  async createEventRegister(
    @Body(ValidationPipe) regEvent: EventRegisterFormDto,
  ): Promise<EventRegSummary> {
    return this.eventRegService.createRegistrationForEvent(regEvent);
  }
}
