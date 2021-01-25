import { Controller, Post } from '@nestjs/common';

import { EventService } from './event.service';

@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}

  @Post()
  async createEvent() {
    return 'create new event';
  }
}
