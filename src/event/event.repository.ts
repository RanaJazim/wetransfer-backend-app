import { EntityRepository, LessThan, MoreThan, Repository } from 'typeorm';

import { Event } from './event.entity';
import { EventDto, EventFormDto } from './dtos';

@EntityRepository(Event)
export class EventRepository extends Repository<Event> {
  async createEvent(event: EventFormDto): Promise<EventDto> {
    let newEvent = new Event();
    newEvent.copy(event);

    return await newEvent.save();
  }

  async getCurrentEvent() {
    const event = await this.query(`
      SELECT Case 
      when TIMESTAMPDIFF(YEAR, dateOfBirth, NOW()) < 25 then '<25'
      when TIMESTAMPDIFF(YEAR, dateOfBirth, NOW()) between 25 and 35 then '25-35'
      when TIMESTAMPDIFF(YEAR, dateOfBirth, NOW()) between 36 and 50 then '36-50'
      else '>50' END AS age_group, 
      sum(if(gender='male', 1, 0)) as male, 
      sum(if(gender='female', 1, 0)) as female, 
      COUNT(1) as total FROM event_register 
      GROUP BY Case 
      when TIMESTAMPDIFF(YEAR, dateOfBirth, NOW()) < 25 then '<25'
      when TIMESTAMPDIFF(YEAR, dateOfBirth, NOW()) between 25 and 35 then '25-35'
      when TIMESTAMPDIFF(YEAR, dateOfBirth, NOW()) between 36 and 50 then '36-50'
      else '>50' END;
    `);

    return event;
  }

  async futureEvents(): Promise<EventDto[]> {
    return this.find({ where: { eventDate: MoreThan(this.getCurrentDate()) } });
  }

  async pastEvents(): Promise<EventDto[]> {
    return this.find({ where: { eventDate: LessThan(this.getCurrentDate()) } });
  }

  getCurrentDate(): string {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    return yyyy + '-' + mm + '-' + dd;
  }
}
