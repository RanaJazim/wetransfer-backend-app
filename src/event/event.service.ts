import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { EventDto, EventFormDto } from './dtos';
import { EventRepository } from './event.repository';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventRepository)
    private eventRepository: EventRepository,
  ) {}

  fetchAllEvents(): Promise<EventDto[]> {
    return this.eventRepository.find();
  }

  async fetchSingleEvent(id: number): Promise<EventDto> {
    const eventInDb = await this.eventRepository.findOne(id);
    if (!eventInDb) throw new NotFoundException(`Event with ${id} not found`);
    return eventInDb;
  }

  createEvent(event: EventFormDto): Promise<EventDto> {
    return this.eventRepository.createEvent(event);
  }
}
