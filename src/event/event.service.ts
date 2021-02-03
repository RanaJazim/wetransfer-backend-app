import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { EventDto, EventFormDto } from './dtos';
import { Event } from './event.entity';
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

  async currentEvent() {
    const records = await this.eventRepository.getCurrentEvent();

    let ageKeys = [];
    let ageSummary = [];
    let male = 0;
    let female = 0;
    let total = 0;

    for (const rec of records) {
      const obj = { [rec.age_group]: +rec.total };
      ageSummary.push(obj);
      ageKeys.push(rec.age_group);

      male += +rec.male;
      female += +rec.female;
      total += +rec.total;
    }

    if (!ageKeys.includes('<25')) ageSummary.push({ '<25': 0 });
    if (!ageKeys.includes('25-35')) ageSummary.push({ '25-35': 0 });
    if (!ageKeys.includes('36-50')) ageSummary.push({ '36-50': 0 });
    if (!ageKeys.includes('>50')) ageSummary.push({ '>50': 0 });

    return { ageSummary, male, female, total };
  }

  fetchFutureEvents(): Promise<EventDto[]> {
    return this.eventRepository.futureEvents();
  }

  pastEvents(): Promise<EventDto[]> {
    return this.eventRepository.pastEvents();
  }

  async fetchSingleEvent(id: number): Promise<Event> {
    const eventInDb = await this.eventRepository.findOne(id);
    if (!eventInDb) this.throwNotFoundException(id);
    return eventInDb;
  }

  createEvent(event: EventFormDto): Promise<EventDto> {
    return this.eventRepository.createEvent(event);
  }

  async updateEvent(event: EventFormDto, id: number): Promise<EventDto> {
    const eventInDb = await this.fetchSingleEvent(id);
    eventInDb.copy(event);

    return await eventInDb.save();
  }

  async deleteEvent(id: number): Promise<void> {
    const result = await this.eventRepository.delete(id);

    if (result.affected == 0) this.throwNotFoundException(id);
  }

  private throwNotFoundException(id: number) {
    throw new NotFoundException(`Event with ${id} not found`);
  }
}
