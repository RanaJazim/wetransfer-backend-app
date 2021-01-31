import { EntityRepository, MoreThan, Repository } from 'typeorm';

import { Event } from './event.entity';
import { EventDto, EventFormDto } from './dtos';

@EntityRepository(Event)
export class EventRepository extends Repository<Event> {
  async createEvent(event: EventFormDto): Promise<EventDto> {
    let newEvent = new Event();
    newEvent.copy(event);

    return await newEvent.save();
  }

  async futureEvents(): Promise<EventDto[]> {
    return this.find({ where: { eventDate: MoreThan(this.getCurrentDate()) } });
  }

  getCurrentDate(): string {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    return yyyy + '-' + mm + '-' + dd;
  }
}
