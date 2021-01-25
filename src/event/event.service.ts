import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { EventDto, EventFormDto } from './dtos';
import { EventRepository } from './event.repository';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventRepository)
    private eventRepository: EventRepository,
  ) {}

  createEvent(event: EventFormDto): Promise<EventDto> {
    return this.eventRepository.createEvent(event);
  }
}
