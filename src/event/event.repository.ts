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
      SELECT *
      FROM event
      WHERE yearweek(DATE(eventDate), 1) = yearweek(curdate(), 1)
      LIMIT 1
    `);

    return event;
  }

  async getTotalPriceEarnedByCurrentEvent() {
    const event = await this.query(`
      SELECT SUM(priceToApply + mealPrice + federatedPrice) as eventTotalPrice
      FROM event
      WHERE yearweek(DATE(eventDate), 1) = yearweek(curdate(), 1)
      LIMIT 1
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
