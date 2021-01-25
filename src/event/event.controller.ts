import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';

import { EventDto, EventFormDto } from './dtos';
import { EventService } from './event.service';

@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}

  @Get()
  async fetchAllEvents(): Promise<EventDto[]> {
    return this.eventService.fetchAllEvents();
  }

  @Get(':id')
  async fetchSingleEvent(@Param('id') id: number): Promise<EventDto> {
    return this.eventService.fetchSingleEvent(id);
  }

  @Post()
  async createEvent(
    @Body(ValidationPipe) event: EventFormDto,
  ): Promise<EventDto> {
    return this.eventService.createEvent(event);
  }
}
