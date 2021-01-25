import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';

import { EventDto, EventFormDto } from './dtos';
import { EventService } from './event.service';

@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}

  @Post()
  async createEvent(
    @Body(ValidationPipe) event: EventFormDto,
  ): Promise<EventDto> {
    return this.eventService.createEvent(event);
  }
}
