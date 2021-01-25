import { EntityRepository, Repository } from 'typeorm';

import { Event } from './event.entity';
import { EventDto, EventFormDto } from './dtos';

@EntityRepository(Event)
export class EventRepository extends Repository<Event> {
  async createEvent(event: EventFormDto): Promise<EventDto> {
    let newEvent = new Event();
    newEvent.copy(event);

    return await newEvent.save();
  }
}
